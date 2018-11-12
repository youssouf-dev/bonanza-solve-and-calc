import React from 'react';
import BonanzaSolver from './../view/BonanzaSolver';
import BonanzaFindZero from './../view/BonanzaFindZero';
import NewBonanza from './../view/NewBonanza';
import BonanzaCalculator from '../view/BonanzaCalculator';

export default [
  {
    name: "Home",
    path: "",
    response() {
      return {
        body: BonanzaSolver
      };
    }
  },
  {
    name: "Calc",
    path: "calc",
    response() {
      return {
        body: BonanzaCalculator
      };
    }
  },
  {
    name: "New",
    path: "new",
    response() {
      return {
        body: NewBonanza
      };
    }
  },
  {
    name: "Find Zero",
    path: "find-zero",
    response() {
      return {
        body: BonanzaFindZero
      };
    }
  },
  {
    name: "Catch All",
    path: "(.*)",
    response() {
      return {
        body: <h1>Page Not Found</h1>
      };
    }
  }
];
