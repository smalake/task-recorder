import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Menu.module.css";

export const Menu = () => {
  const navigate = useNavigate();
  const timerStart = (id: number) => {
    navigate(`/timer/${id}`);
  };
  const getList = () => {
    navigate("/list");
  };
  return (
    <div className={styles.container}>
      <h2>メニュー</h2>
      <div className={styles.buttonList}>
        <button
          className={styles.button}
          onClick={() => {
            navigate("/list");
          }}
        >
          タスク一覧
        </button>
        <button
          className={styles.button}
          onClick={() => {
            navigate("/record-menu");
          }}
        >
          タスク記録
        </button>
      </div>
    </div>
  );
};
