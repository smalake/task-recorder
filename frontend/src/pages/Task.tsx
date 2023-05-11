import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetTask } from "../../wailsjs/go/main/Task";
import styles from "./Task.module.css";

interface Task {
  category: number;
  name: string;
  start: string;
  end: string;
  work: string;
  file: string;
}

export const Task = () => {
  const navigate = useNavigate();
  const { file } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [work, setWork] = useState([0, 0, 0]);

  useEffect(() => {
    const getTasks = async () => {
      const res = await GetTask(file!);
      setTasks(res);
      const newWorkArray = [...work];
      res.forEach((value) => {
        const categoryIndex = value.category;
        const baseInt = newWorkArray[categoryIndex] * 100;
        const workInt = parseFloat(value.work) * 100;
        const workFloat = (baseInt + workInt) / 100;
        newWorkArray[categoryIndex] = workFloat;
      });
      setWork(newWorkArray);
    };
    getTasks();
  }, [file]);

  console.log(work);

  return (
    <div className={styles.container}>
      <h2>Task</h2>
      <div>
        <ul>
          <li className={styles.total}>案件1: {work[0]}時間</li>
          <li className={styles.total}>案件2: {work[1]}時間</li>
          <li className={styles.total}>自社作業: {work[2]}時間</li>
        </ul>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <th className={styles.title}>案件名</th>
          <th className={styles.title}>開始時刻</th>
          <th className={styles.title}>終了時刻</th>
          <th className={styles.title}>作業時間</th>
          {tasks.map((task) => (
            <tr key={task.name}>
              <td className={styles.list}>{task.name}</td>
              <td className={styles.list}>{task.start}</td>
              <td className={styles.list}>{task.end}</td>
              <td className={styles.list}>{task.work}</td>
            </tr>
          ))}
        </table>
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
