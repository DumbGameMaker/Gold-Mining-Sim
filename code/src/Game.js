import React, { useState, useEffect, useCallback } from "react";

const formatMoney = v =>
  v.toLocaleString(undefined, {
    style: "currency",
    currency: "USD"
  });
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function Game() {
  let tool = "pickaxe";
  const [goldAmt, goldAmtCreate] = useState(0);
  const [cashReserves, cashReserveSet] = useState(0);
  const [cashValueOfGold, setCashValueOfGold] = useState(0);
  const [toolTier, setBuyTool] = useState(1);
  const [toolUnits, setToolUnits] = useState(1);
  const [toolPrice, setToolPrice] = useState(250);
  const [hasManager, setHasManager] = useState(false);
  const [hasManager2, setHasManager2] = useState(false);
  const [hideManButton, setHideManButton] = useState(false);
  const [toolEff, setToolEff] = useState(getRandomInt(1.875, 5));
  const [upgradeBought, letUpgradeBought] = useState(false);
  const [upgradePrice, setUpgradePrice] = useState(600000);
  const [upgradeEff, setUpgradeEff] = useState(17.5);
  const [boostAmt, setBoostAmt] = useState(150);
  const [boostPrice, setBoostPrice] = useState(1000000000000);
  const onClickPrestige = () => {
    if (cashReserves >= boostPrice && cashReserves <= 1200000000000000000) {
      cashReserveSet(0);//reset portion
      setBoostPrice(boostPrice * 20);
      goldAmtCreate(0);
      cashReserveSet(0);
      setCashValueOfGold(0);
      setBuyTool(1);
      setToolUnits(1);
      setToolPrice(250);
      setHasManager(false);
      setHasManager2(false);
      setHideManButton(false);
      letUpgradeBought(false);
      setUpgradePrice(600000);
      setUpgradeEff(20);//ends reset portion
      setToolEff(toolEff * boostAmt);
      setBoostAmt(boostAmt * 10);
    } else if (cashReserves > 1200000000000000000) {
      cashReserveSet(0);//reset portion
      setBoostPrice(boostPrice * 20);
      goldAmtCreate(0);
      cashReserveSet(0);
      setCashValueOfGold(0);
      setBuyTool(1);
      setToolUnits(1);
      setToolPrice(250);
      setHasManager(false);
      setHasManager2(false);
      setHideManButton(false);
      letUpgradeBought(false);
      setUpgradePrice(600000);
      setUpgradeEff(20);//ends reset portion
      setToolEff(getRandomInt(1.875, 5) * 25);
      setBoostAmt(boostAmt * 10);
    }
  }
  const onClickUseTool = useCallback(() => {
    goldAmtCreate(goldAmt + toolUnits);
  }, [goldAmt, toolUnits]);
  const onClickSellGold = () => {
    cashReserveSet(cashReserves + cashValueOfGold);
    goldAmtCreate(0);
  };

  const onClickNewTool = () => {
    if (cashReserves >= toolPrice) {
      setToolUnits(toolUnits * 2);
      cashReserveSet(cashReserves - toolPrice);
      setToolPrice(toolPrice * (getRandomInt(15, 25) / 10));
      setBuyTool(toolTier + 1);
      setToolEff(getRandomInt(2.5, 5));
    }
  };
  const onClickNewMan = () => {
    if (cashReserves >= 6000) {
      if (hasManager === false) {
        cashReserveSet(cashReserves - 4500);
        setHasManager(true);
      } else if (hasManager === true) {
        cashReserveSet(cashReserves - 4500);
        setHasManager2(true);
        setHideManButton(true);
      }
    }
  };
  const onClickGetProdUpg = () => {
if (cashReserves >= upgradePrice) {
      cashReserveSet(cashReserves - upgradePrice);
      letUpgradeBought(true);
      setToolUnits(toolUnits * upgradeEff);
      setUpgradePrice(upgradePrice * upgradeEff);
      setUpgradeEff(upgradeEff * 2.5);
    }
  }

  useEffect(() => {
    setCashValueOfGold(toolEff * goldAmt);
  }, [goldAmt, toolEff, setCashValueOfGold]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (hasManager === true && hasManager2 === false) {
        goldAmtCreate(goldAmt + toolUnits);
      } else if (hasManager === true && hasManager2 === true) {
        goldAmtCreate(goldAmt + toolUnits * 2);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hasManager, toolUnits, hasManager2, onClickUseTool, goldAmt]);

  return (
    <div className="app" id="Main">
      <p>Game started!</p>
      <div id="Game">
        <h3 id="goldAmt">
          You have {Math.round(goldAmt)} units of gold and {formatMoney(cashReserves)}.
        </h3>
        <h5>
          using this gold you can get your balance up to{" "}
          {formatMoney(cashReserves + cashValueOfGold)}
        </h5>
        <h5>
          Your level {toolTier} pickaxe makes you {Math.round(toolUnits)} units of gold per
          click
        </h5>
        <button
        className="button"
        id="mine"
        onClick={onClickUseTool}
        >
          Use {tool}
        </button>
        <button
        className="button"
        id="sell"
        onClick={onClickSellGold}
        >
          Sell {goldAmt} units of <br />
          gold and
          <br /> make {formatMoney(cashValueOfGold)}
        </button>
        <button
        className="button"
        id="upg"
        onClick={onClickNewTool}
        >
          Upgrade Tool <br />
          for {formatMoney(toolPrice)}
        </button>
        <br />
        <button
          className="button"
          id="upgMan"
          hidden={hideManButton}
          onClick={onClickNewMan}
        >
          Activate manager <br /> for $4500 <br /> (Note: You must <br />
          have $6000 to use
          <br /> this button)
        </button>
        <button
          className="button"
          id="upgradeProduction"
          onClick={onClickGetProdUpg}
        >
          Upgrade production <br /> for {formatMoney(upgradePrice)}.<br /> Add {upgradeEff * 100}% production
          </button>
          <button
          className="button"
          id="Prestige"
          onClick={onClickPrestige}
          >
          Prestige! <br />
          Reset all your progress<br />
           for a {boostAmt} Boost! <br />
           Costs {formatMoney(boostPrice)}
           </button>
      </div>
    </div>
  );
}

export default Game;
