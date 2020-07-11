import DropDown from "./Dropdown.vue";
import Button from "./Button";

import Card from "./Cards/Card.vue";
import ChartCard from "./Cards/ChartCard.vue";
import StatsCard from "./Cards/StatsCard.vue";

import SidebarPlugin from "./SidebarPlugin/index";

let components = {
  Card,
  ChartCard,
  StatsCard,
  DropDown,
  SidebarPlugin
};

export default components;

export {
  Card,
  ChartCard,
  StatsCard,
  DropDown,
  Button,
  SidebarPlugin
};
