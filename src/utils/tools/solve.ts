import { SolvingMethods } from "../../types/solvingMethods.type";
import { calcIMoments } from "../physics-impl/calcIMoments";
import { eulerSolver } from "../physics-impl/eulerSolver";
import { rk4Solver } from "../physics-impl/rk4Solver";

interface IData {
  a: number;
  b: number;
  c: number;
  m: number;
  wx: number;
  wy: number;
  wz: number;
  dt: number;
  T: number;
}

export const solve = (data: IData, method: SolvingMethods) => {
  if (method === SolvingMethods.EULER) {
    const [I_x, I_y, I_z] = calcIMoments([data.a, data.b, data.c, data.m]);
    return eulerSolver(
      I_x,
      I_y,
      I_z,
      data.wx,
      data.wy,
      data.wz,
      data.dt,
      data.T,
    );
  } else if (method === SolvingMethods.RK_4) {
    const [I_x, I_y, I_z] = calcIMoments([data.a, data.b, data.c, data.m]);
    return rk4Solver(I_x, I_y, I_z, data.wx, data.wy, data.wz, data.dt, data.T);
  }
};
