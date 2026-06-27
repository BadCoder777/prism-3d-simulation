export const rk4Solver = (I_x, I_y, I_z, wx_init, wy_init, wz_init, dt, T) => {
  const _time = [];
  const _wx = [];
  const _wy = [];
  const _wz = [];

  let wx = wx_init;
  let wy = wy_init;
  let wz = wz_init;

  const getDerivatives = (x, y, z) => {
    return [
      ((I_y - I_z) / I_x) * y * z,
      ((I_z - I_x) / I_y) * z * x,
      ((I_x - I_y) / I_z) * x * y,
    ];
  };

  for (let i = 0; i < T; i += dt) {
    _time.push(i);
    _wx.push(wx);
    _wy.push(wy);
    _wz.push(wz);

    const [dwx1, dwy1, dwz1] = getDerivatives(wx, wy, wz);

    const [dwx2, dwy2, dwz2] = getDerivatives(
      wx + dwx1 * (dt / 2),
      wy + dwy1 * (dt / 2),
      wz + dwz1 * (dt / 2),
    );

    const [dwx3, dwy3, dwz3] = getDerivatives(
      wx + dwx2 * (dt / 2),
      wy + dwy2 * (dt / 2),
      wz + dwz2 * (dt / 2),
    );

    const [dwx4, dwy4, dwz4] = getDerivatives(
      wx + dwx3 * dt,
      wy + dwy3 * dt,
      wz + dwz3 * dt,
    );

    wx = wx + (dt / 6) * (dwx1 + 2 * dwx2 + 2 * dwx3 + dwx4);
    wy = wy + (dt / 6) * (dwy1 + 2 * dwy2 + 2 * dwy3 + dwy4);
    wz = wz + (dt / 6) * (dwz1 + 2 * dwz2 + 2 * dwz3 + dwz4);
  }

  console.log([_time, _wx, _wy, _wz]);
  return [_time, _wx, _wy, _wz];
};
