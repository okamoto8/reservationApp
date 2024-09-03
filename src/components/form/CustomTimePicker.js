import React, { useState } from "react";
import { TextField, Popover, Box, IconButton } from "@mui/material";
import { DigitalClock } from "@mui/x-date-pickers";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function CustomTimePicker({ label, value, onChange,ampm,className }) {
  const [anchorEl, setAnchorEl] = useState(null); // ポップオーバーのアンカー（基点）要素の状態を管理

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // テキストフィールドがクリックされたときにアンカー要素を設定
  };

  const handleClose = () => {
    setAnchorEl(null); // ポップオーバーを閉じるときにアンカー要素をクリア
  };

  const open = Boolean(anchorEl); // ポップオーバーが開いているかどうかを判定

  return (
    <div className={`customTimePickerContainer ${className}`}>
      <TextField
        label={label} // テキストフィールドのラベル
        value={value.format("HH:mm")} // テキストフィールドの値（時間）をフォーマットして表示
        onClick={handleClick} // テキストフィールドがクリックされたときの処理
        readOnly // テキストフィールドを読み取り専用に設定
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleClick}>
              <AccessTimeIcon /> 
            </IconButton>
          ),
        }}
      />
      <Popover
        open={open} // ポップオーバーが開いているかどうか
        anchorEl={anchorEl} // ポップオーバーのアンカー要素
        onClose={handleClose} // ポップオーバーを閉じるときの処理
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box p={2}>
          <DigitalClock
            value={value} // デジタル時計の現在の値
            onChange={(newValue) => {
              onChange(newValue); // 新しい値を親コンポーネントに渡す
              handleClose(); // ポップオーバーを閉じる
            }}
            ampm = {ampm}
          />
        </Box>
      </Popover>
    </div>
  );
}

export default CustomTimePicker;
