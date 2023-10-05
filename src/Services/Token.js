function setToken(accessToken) {
    localStorage.setItem('accessToken', accessToken);
    // localStorage.setItem("refreshToken", refreshToken);
}
const getToken = async () => {
    return [localStorage.getItem('accessToken')];
    // return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hY2NvdW50IjoyNSwiZW1haWwiOiJtaW5nQGdtYWlsLmNvbSIsInBob25lIjoiMDk2NjkzMjI2NyIsIm5hbWUiOm51bGwsImNyZWF0ZWRfdGltZSI6IjIwMjMtMTAtMDNUMDc6MTc6MTIuMDAwWiIsImFkZHJlc3MiOm51bGwsImF2YXRhciI6bnVsbCwic3RhdHVzIjowLCJyb2xlX2lkIjowLCJpYXQiOjE2OTY0OTQ2OTV9.e0btoicTrrG-KDPTM7--DoHzItBuM0AvnE_CXmtD-ZA';
};

export { setToken, getToken };
