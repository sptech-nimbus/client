import { useState } from "react";
import OnGoingMatch from "./OnGoingMatch";
import FinishedMatch from "./FinishedMatch";

export default function Match({ isMatchFinished }) {

   return isMatchFinished ? <FinishedMatch /> : <OnGoingMatch />
}