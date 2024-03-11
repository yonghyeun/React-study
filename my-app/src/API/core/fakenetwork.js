export default function fakeNetwork() {
  return new Promise((res) => {
    setTimeout(res, 300);
  });
}
