import Xlsx from 'xlsx';
/**
 * workbook 工作簿
 * sheets 工作表
 * cellAddress 起始坐标到结束坐标返回如 A1:B2
 * cell 单元格 v 源数据 w 格式化文本 t 单元格类型 r 解码后富文本 h 渲染成html的富文本 c 单元格注释 z 格式化字符串
 *
 * xlsx 本身功能：解析数据/导出数据
 * utils工具类：数据添加到数据表中 二维数据转换成工作表 工作簿换成另外中数据格式 工作簿、单元格操作 行列之间转码解码
 * */

// function generateArray(table) {}
export function createSheets(data, filename) {
    console.log(data);
    // 创建工作簿
    const workbook = Xlsx.utils.book_new();
    // 二维数组转换成工作表对象
    // const worksheet = Xlsx.utils.aoa_to_sheet(data);
    // 对象换成工作表
    const worksheet = Xlsx.utils.json_to_sheet(data);
    Xlsx.utils.book_append_sheet(workbook, worksheet, 'sheet1');
    Xlsx.writeFile(workbook, filename);
}

export function formatJson(filterVal, jsonData) {
    return jsonData.map((v) => filterVal.map((j) => v[j]));
}
// function readExcel() {}
