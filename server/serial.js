// 返回所有作品的访问地址列表
const serial = {
  start: 1043,
  end: 1300
};
const baseApi = '/api/masterpiece?id=';
const mps = [];

let cnt = serial.start;
while(cnt <= serial.end){
  mps.push({
    id: cnt,
    url: baseApi + cnt
  });
  cnt++;
}
module.exports = {
  mps
}