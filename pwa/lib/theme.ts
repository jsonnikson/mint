import { container } from "tsyringe";
import { unstable_createMuiStrictModeTheme, Theme } from "@material-ui/core";

container.register<Theme>('Theme', {useValue: unstable_createMuiStrictModeTheme()})
