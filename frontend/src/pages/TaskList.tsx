import React, { useEffect, useState } from "react";
import { GetList } from "../../wailsjs/go/main/List";
import { useNavigate } from "react-router-dom";
import styles from "./TaskList.module.css";

export const TaskList = () => {
  const [list, setList] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // タスクが記載されているJSON一覧を取得
    const getList = async () => {
      const res = await GetList();
      setList(res);
    };
    getList();
  }, []);

  // クリックした日付の詳細を表示
  const showTask = (file: string) => {
    navigate(`/task/${file}`);
  };

  return (
    <div className={styles.container}>
      <h2>タスク一覧</h2>
      <div>
        <ul>
          {list.map((item) => (
            <li
              className={styles.list}
              onClick={() => {
                showTask(item);
              }}
              key={item}
            >
              {item.replace(".json", "")}
            </li>
          ))}
        </ul>
      </div>
      <button
        className={styles.back}
        onClick={() => {
          navigate("/");
        }}
      >
        戻る
      </button>
    </div>
  );
};
