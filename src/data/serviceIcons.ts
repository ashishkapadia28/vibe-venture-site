import type { IconType } from "react-icons";
import {
  TbCode, TbDeviceMobile, TbVectorBezier2, TbRobot, TbSourceCode, TbShoppingCart, TbPalette,
  TbWorld, TbCloud, TbShoppingBag, TbLayoutGrid, TbPlug,
  TbBrandAndroid, TbBrandApple, TbBrandReact, TbFeather, TbBriefcase,
  TbLayoutDashboard, TbSearch, TbStack2,
  TbMessageCircle, TbSettingsAutomation, TbDatabase, TbLink,
  TbTerminal2, TbUsers, TbBuilding, TbTool,
  TbBrandWordpress, TbBuildingStore, TbCreditCard,
  TbFingerprint, TbPencil, TbBook2, TbSpeakerphone,
  TbTrendingUp, TbFlask, TbChartBar,
} from "react-icons/tb";

/**
 * Maps icon name strings (as they appear in services.json) to their React
 * icon components. JSON can't hold component references, so the data layer
 * stores plain string names and this map resolves them at read time.
 */
export const serviceIcons: Record<string, IconType> = {
  TbCode, TbDeviceMobile, TbVectorBezier2, TbRobot, TbSourceCode, TbShoppingCart, TbPalette,
  TbWorld, TbCloud, TbShoppingBag, TbLayoutGrid, TbPlug,
  TbBrandAndroid, TbBrandApple, TbBrandReact, TbFeather, TbBriefcase,
  TbLayoutDashboard, TbSearch, TbStack2,
  TbMessageCircle, TbSettingsAutomation, TbDatabase, TbLink,
  TbTerminal2, TbUsers, TbBuilding, TbTool,
  TbBrandWordpress, TbBuildingStore, TbCreditCard,
  TbFingerprint, TbPencil, TbBook2, TbSpeakerphone,
  TbTrendingUp, TbFlask, TbChartBar,
};
