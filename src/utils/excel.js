import Xlsx from 'xlsx';
/**
 * workbook 工作簿
 * sheets 工作表
 * cellAddress 起始坐标到结束坐标返回如 A1:B2
 * cell 单元格 v 源数据 w 格式化文本 t 单元格类型 r 解码后富文本 h 渲染成html的富文本 c 单元格注释 z 格式化字符串
 *
 * xlsx 本身功能：解析数据/导出数据
 * utils工具类：数据添加到数据表中 二维数据转换成工作表 工作簿换成另外中数据格式 工作簿、单元格操作 行列之间转码解码
 * 地址范围
 * const start = { c: 0, r: 0 };
 * const end = { c: 1, r: 1 };
 * 修改数据表的数据
 * const workSheet = 
    utils.json_to_sheet([
    { '列1': 1, '列2': 2, '列3': 3 },
    { '列1': 4, '列2': 5, '列3': 6 }
    ],{
        header:['列1','列2','列3'],
        skipHeader:true// 跳过上面的标题行
    })

    utils.sheet_add_aoa(workSheet,[
        [7,8,9],
        ['A','B','C']
    ],{
        origin:'A1' // 从A1开始增加内容
    });

    123
    456
    将会变成
    789 
    ABC
 * */

// function generateArray(table) {}
export function createSheets(data, filename) {
    // 创建工作簿
    const workbook = Xlsx.utils.book_new();
    // 二维数组转换成工作表对象
    const worksheet = Xlsx.utils.aoa_to_sheet(data);
    // 对象换成工作表
    // const worksheet = Xlsx.utils.json_to_sheet(data);
    Xlsx.utils.book_append_sheet(workbook, worksheet, 'sheet1');
    Xlsx.writeFile(workbook, filename);
}

export function formatJson(filterVal, jsonData) {
    return jsonData.map((v) => filterVal.map((j) => v[j]));
}

export function readExcel(data) {
    let wb = Xlsx.read(data, {
        type: 'binary',
    });
    let headers = getHeaderRow(wb.Sheets[wb.SheetNames[0]]);
    let results = Xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
    return { headers, results };
}

// 通过读取第一行每一列得到表头
function getHeaderRow(sheet) {
    const headers = [];
    const range = Xlsx.utils.decode_range(sheet['!ref']); // 表格范围

    let C;
    const R = range.s.r; //范围开始的行数
    /* start in the first row */
    for (C = range.s.c; C <= range.e.c; ++C) {
        //读其中每一个列数（第一行）
        /* walk every column in the range */
        const cell = sheet[Xlsx.utils.encode_cell({ c: C, r: R })];
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C; // <-- replace with your desired default
        if (cell && cell.t) hdr = Xlsx.utils.format_cell(cell);
        headers.push(hdr);
    }
    return headers;
}
