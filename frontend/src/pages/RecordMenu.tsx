import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Menu.module.css";

export const RecordMenu = () => {
  const navigate = useNavigate();
  const timerStart = (id: number) => {
    navigate(`/timer/${id}`);
  };

  return (
    <div className={styles.container}>
      <h2>メニュー</h2>
      <div className={styles.buttonList}>
        <button className={styles.button} onClick={() => timerStart(0)}>
          案件1
        </button>
        <button className={styles.button} onClick={() => timerStart(1)}>
          案件2
        </button>
        <button className={styles.button} onClick={() => timerStart(2)}>
          自社作業
        </button>
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
