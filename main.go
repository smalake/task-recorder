package main

import (
	"embed"
	"encoding/json"
	"os"
	"path/filepath"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

type Task struct {
	Category int    `json:"category"`
	Name     string `json:"name"`
	Start    string `json:"start"`
	End      string `json:"end"`
	Work     string `json:"work"`
	File     string `json:"file"`
}
type List struct {
	Name []string
}

// タスクを保存
func (t *Task) SaveTask() string {
	// 既存のタスクを読み込む
	var tasks []Task
	filePath := filepath.Join(filepath.Dir(os.Args[0]), t.File)
	fp, err := os.Open(filePath)
	if err == nil {
		json.NewDecoder(fp).Decode(&tasks)
		fp.Close()
	}

	// 新しいタスクを配列に追加
	tasks = append(tasks, *t)

	// 配列をJSON形式に変換
	file, err := json.MarshalIndent(tasks, "", "\t")
	if err != nil {
		return err.Error()
	}

	// ファイルに書き込む
	fp, err = os.OpenFile(filePath, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, 0644)
	if err != nil {
		return err.Error()
	}
	defer fp.Close()

	if _, err := fp.Write(file); err != nil {
		return err.Error()
	}
	if _, err := fp.WriteString("\n"); err != nil {
		return err.Error()
	}

	return "ok"
}

// タスクをセット
func (t *Task) SetTask(category int, name, start, end, work, file string) {
	t.Category = category
	t.Name = name
	t.Start = start
	t.End = end
	t.Work = work
	t.File = file
}

// タスクの詳細を取得
func (t *Task) GetTask(file string) []Task {
	var tasks []Task
	filepath := filepath.Join(filepath.Dir(os.Args[0]), file)
	fp, err := os.Open(filepath)
	if err != nil {
		println("File open fail:", err)
	}
	defer fp.Close()

	err = json.NewDecoder(fp).Decode(&tasks)
	if err != nil {
		println("Json decode error:", err)
		return nil
	}
	return tasks
}

// タスク一覧を取得
func (l List) GetList() []string {
	// ディレクトリ内のファイル一覧を取得
	filepath := filepath.Dir(os.Args[0])
	files, err := os.ReadDir(filepath)
	if err != nil {
		println("Error:", err)
	}
	// 実行ファイル以外のファイル一覧を構造体へ保存
	for _, file := range files {
		if file.Name() != "redmine_recorder" {
			l.Name = append(l.Name, file.Name())
		}
	}
	return l.Name
}

func main() {
	// Create an instance of the app structure
	task := &Task{}
	list := &List{}

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "redmine_recorder",
		Width:  500,
		Height: 700,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		Bind: []interface{}{
			task,
			list,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
