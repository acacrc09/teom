/*
    ################################################################
    ###### Los montos de entrada deben venir expresados en UF ######
    ################################################################

    Paso 1: Calculo de tasa de interes mensual

    Tm = (1 + Ta / 100)^(1/12) - 1

    Donde:
    Tm = Tasa Mensual
    Ta = Tasa Anual

    Paso 2: Calculo de numero de cuotas

    n = a * 12

    Donde:
    n = Plazo en numero de cuotas
    a = Plazo en años

    Paso 3: Calculo de monto del prestamo

    K = Vp - [(Vp * p) / 100]

    Donde:
    K = Monto del Préstamo
    Vp = Valor propiedad
    p = Porcentaje pagado inicial (Pie)

    Paso 4: Calculo cuota mensual

    Cm = (K * Tm) * {[(1 + Tm)^n] / [(1 + Tm)^n - 1]}

    Donde
    Cm = Cuota Mensual
    K = Monto del Préstamo
    n = Plazo en numero de cuotas
    Tm = Tasa Mensual

    Paso 5: Calculo de costo total

    Ct = Cm * n

    Donde
    Ct = Costo total
    Cm = Cuota Mensual
    n = Plazo en numero de cuotas

    Paso 6: Calculo de valores en pesos

    ---- valores en pesos

*/

const calculateCredit = ({ rate: Ta, value: Vp, initial: p, years: a, uf }) => {
  // Tasa de interes mensual
  const Tm = Math.pow(1 + Ta / 100, 1 / 12) - 1;
  // Numero de cuotas
  const n = a * 12;
  // Monto del prestamo
  const K = Vp - (Vp * p) / 100;
  // Cuota mensual
  const Cm = K * Tm * (Math.pow(1 + Tm, n) / (Math.pow(1 + Tm, n) - 1));
  // Costo total
  const Ct = Cm * n;
  // Cuota Mensual en pesos
  const monthlyCost = calculateUfPesos(Number(Cm.toFixed(2)), uf);
  // Cuota Mensual en UF
  const monthlyCostUf = Number(Cm.toFixed(2));
  // Cuota Mensual en pesos
  const totalCost = calculateUfPesos(Number(Ct.toFixed(2)), uf);
  // Cuota Mensual en UF
  const totalCostUf = Number(Ct.toFixed(2));
  // Valor del credito en pesos
  const loanValueUf = calculateUfPesos(K, uf);
  // Valor del credito en UF
  const loanValue = K;
  return {
    monthlyCost,
    monthlyCostUf,
    totalCost,
    totalCostUf,
    loanValue,
    loanValueUf,
  };
};

const calculateUfPesos = (mount, uf) => Math.round(mount * uf);

module.exports = { calculateCredit, calculateUfPesos };
