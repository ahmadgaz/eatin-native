import { StyleSheet } from "react-native";

// These are the tokens that will be used to style the components.
export const tokens = (mode: "light" | "dark") => ({
    border: 1.5,
    border_radius: 8,
    box_shadow: 3,
    box_shadow_hovered: 1.5,
    box_shadow_active: 0,
    colors:
        mode === "light"
            ? {
                  primary: {
                      100: "#ffeed5",
                      200: "#ffdcac",
                      300: "#fecb82",
                      400: "#feb959",
                      500: "#fea82f",
                      600: "#cb8626",
                      700: "#98651c",
                      800: "#664313",
                      900: "#332209",
                  },
                  secondary: {
                      100: "#dddaf4",
                      200: "#bbb6e9",
                      300: "#9891de",
                      400: "#766dd3",
                      500: "#5448c8",
                      600: "#433aa0",
                      700: "#322b78",
                      800: "#221d50",
                      900: "#110e28",
                  },

                  neutralDark: {
                      100: "#d9d8d8",
                      200: "#b3b2b1",
                      300: "#8e8b89",
                      400: "#686562",
                      500: "#423e3b",
                      600: "#35322f",
                      700: "#282523",
                      800: "#1a1918",
                      900: "#0d0c0c",
                  },
                  neutralLight: {
                      100: "#fffff5",
                      200: "#ffffea",
                      300: "#fffee0",
                      400: "#fffed5",
                      500: "#fffecb",
                      600: "#cccba2",
                      700: "#99987a",
                      800: "#666651",
                      900: "#333329",
                  },
                  redAccent: {
                      100: "#ffd5cc",
                      200: "#ffab99",
                      300: "#ff8266",
                      400: "#ff5833",
                      500: "#ff2e00",
                      600: "#cc2500",
                      700: "#991c00",
                      800: "#661200",
                      900: "#330900",
                  },
              }
            : {
                  primary: {
                      100: "#ffeed5",
                      900: "#ffdcac",
                      800: "#fecb82",
                      700: "#feb959",
                      600: "#fea82f",
                      500: "#cb8626",
                      400: "#98651c",
                      300: "#664313",
                      200: "#332209",
                  },
                  secondary: {
                      100: "#dddaf4",
                      200: "#bbb6e9",
                      300: "#9891de",
                      400: "#766dd3",
                      500: "#5448c8",
                      600: "#433aa0",
                      700: "#322b78",
                      800: "#221d50",
                      900: "#110e28",
                  },

                  neutralDark: {
                      100: "#666651",
                      200: "#99987a",
                      300: "#99987a",
                      400: "#cccba2",
                      500: "#fffecb",
                      600: "#fffed5",
                      700: "#fffee0",
                      800: "#ffffea",
                      900: "#fffff5",
                  },
                  neutralLight: {
                      800: "#d9d8d8",
                      900: "#b3b2b1",
                      400: "#8e8b89",
                      200: "#686562",
                      300: "#423e3b",
                      100: "#35322f",
                      500: "#282523",
                      600: "#1a1918",
                      700: "#0d0c0c",
                  },
                  redAccent: {
                      100: "#ffd5cc",
                      200: "#ffab99",
                      300: "#ff8266",
                      400: "#ff5833",
                      500: "#ff2e00",
                      600: "#cc2500",
                      700: "#991c00",
                      800: "#661200",
                      900: "#330900",
                  },
              },
});

// This is the useTheme object used to style components throughout the app
export const useTheme = (mode: "light" | "dark") => {
    const options = tokens(mode);

    return {
        options,
        typography: (
            weight: "bold" | "normal" = "normal",
            style: "italic" | "normal" = "normal"
        ) => {
            return StyleSheet.create({
                hero: {
                    fontFamily:
                        weight === "bold" && style === "italic"
                            ? "ProspectusProXLBlackItalic"
                            : weight === "bold"
                            ? "ProspectusProXLBlack"
                            : style === "italic"
                            ? "ProspectusProXLItalic"
                            : "ProspectusProXLRegular",
                    fontSize: 60,
                    color: options.colors.neutralDark[500],
                },
                h1: {
                    fontFamily:
                        weight === "bold" && style === "italic"
                            ? "ProspectusProXLBoldItalic"
                            : weight === "bold"
                            ? "ProspectusProXLBold"
                            : style === "italic"
                            ? "ProspectusProXLItalic"
                            : "ProspectusProXLRegular",
                    fontSize: 60,
                    color: options.colors.neutralDark[500],
                },
                h2: {
                    fontFamily:
                        weight === "bold" && style === "italic"
                            ? "ProspectusProLBlackItalic"
                            : weight === "bold"
                            ? "ProspectusProLBlack"
                            : style === "italic"
                            ? "ProspectusProLItalic"
                            : "ProspectusProLRegular",
                    fontSize: 48,
                    color: options.colors.neutralDark[500],
                },
                h3: {
                    fontFamily:
                        weight === "bold" && style === "italic"
                            ? "ProspectusProLBoldItalic"
                            : weight === "bold"
                            ? "ProspectusProLBold"
                            : style === "italic"
                            ? "ProspectusProLItalic"
                            : "ProspectusProLRegular",
                    fontSize: 36,
                    color: options.colors.neutralDark[500],
                },
                h4: {
                    fontFamily:
                        weight === "bold" && style === "italic"
                            ? "ProspectusProMBoldItalic"
                            : weight === "bold"
                            ? "ProspectusProMBold"
                            : style === "italic"
                            ? "ProspectusProMItalic"
                            : "ProspectusProMRegular",
                    fontSize: 30,
                    color: options.colors.neutralDark[500],
                },
                h5: {
                    fontFamily:
                        weight === "bold" && style === "italic"
                            ? "ProspectusProMBoldItalic"
                            : weight === "bold"
                            ? "ProspectusProMBold"
                            : style === "italic"
                            ? "ProspectusProMItalic"
                            : "ProspectusProMRegular",
                    fontSize: 24,
                    color: options.colors.neutralDark[500],
                },
                h6: {
                    fontFamily:
                        weight === "bold" && style === "italic"
                            ? "ProspectusProMBoldItalic"
                            : weight === "bold"
                            ? "ProspectusProMBold"
                            : style === "italic"
                            ? "ProspectusProMItalic"
                            : "ProspectusProMRegular",
                    fontSize: 21,
                    color: options.colors.neutralDark[500],
                },
                subtitle1: {
                    fontFamily:
                        weight === "bold" && style === "italic"
                            ? "ProspectusProMItalic"
                            : weight === "bold"
                            ? "ProspectusProMRegular"
                            : style === "italic"
                            ? "ProspectusProMLightItalic"
                            : "ProspectusProMLight",
                    fontSize: 18,
                    color: options.colors.neutralDark[200],
                },
                subtitle2: {
                    fontFamily:
                        weight === "bold" && style === "italic"
                            ? "ProspectusProMBoldItalic"
                            : weight === "bold"
                            ? "ProspectusProMBold"
                            : style === "italic"
                            ? "ProspectusProMItalic"
                            : "ProspectusProMRegular",
                    color: options.colors.neutralDark[500],
                },
                body1: {
                    fontFamily:
                        style === "italic"
                            ? "ProspectusProSItalic"
                            : "ProspectusProSRegular",
                    fontSize: 21,
                    color: options.colors.neutralDark[500],
                },
                body2: {
                    fontFamily:
                        style === "italic"
                            ? "ProspectusProSItalic"
                            : "ProspectusProSRegular",
                    color: options.colors.neutralDark[500],
                },
            });
        },
    };
};
