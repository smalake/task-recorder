import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Timer.module.css";
import { SaveTask, SetTask } from "../../wailsjs/go/main/Task";

export const Timer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const taskList = ["案件1", "案件2", "自社作業"];
  // 作業開始時刻
  const now = new Date();
  const formattedNow = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;

  // 作業終了処理
  const timerEnd = async () => {
    const endTime = new Date();
    const formattedEndTime = `${endTime.getHours().toString().padStart(2, "0")}:${endTime.getMinutes().toString().padStart(2, "0")}:${endTime
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
    const baseWork = (endTime.getTime() - now.getTime()) / (60 * 60 * 1000);
    const work = baseWork.toFixed(2);
    const file = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}.json`;
    // 作業内容を保存
    await SetTask(Number(id), taskList[Number(id)], formattedNow, formattedEndTime, work.toString(), file);
    const res = await SaveTask();
    if (res === "ok") {
      navigate("/");
    }
  };
  return (
    <div>
      <h2 className={styles.taskName}>{taskList[Number(id)]}</h2>
      <div className={styles.startTime}>開始時刻: {formattedNow}</div>
      <button className={styles.button} onClick={timerEnd}>
        終了
      </button>
    </div>
  );
};
