import { ElMessage } from "element-plus";
const result = (data, showSuccess) => {
  if (data.code == 200) {
    if (showSuccess)
      ElMessage({
        type: "success",
        message: data.message,
      });
  } else if (data.code == 500) {
    ElMessage({
      type: "error",
      message: data.message,
      showClose: true,
      duration: 0,
    });
  } else if (data.code == -1) {
    ElMessage({
      type: "error",
      message: data.message,
    });
  } else
    ElMessage({
      type: "warning",
      message: data.message,
    });
};
export default result;
