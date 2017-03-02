// 返回所有作品缩略图的访问地址列表
const serial = {
  start: 1043,
  end: 1300
};
const baseApi = '/api/smallmps?id=';
const smallmps = [];

let cnt = serial.start;
while(cnt <= serial.end){
  smallmps.push({
    id: cnt,
    url: baseApi + cnt
  });
  cnt++;
}
module.exports = smallmps;