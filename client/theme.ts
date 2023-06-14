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
                      500: "#f5c02e",
                  },
                  secondary: {
                      500: "#ffffff",
                  },
                  accent: {
                      400: "#d1e19c",
                      500: "#8cb408",
                  },
                  text: {
                      300: "#ffffff",
                      400: "#cccccc",
                      500: "#808080",
                      600: "#000000",
                  },
                  background: {
                      400: "#ffffff",
                      500: "#f9f2dc",
                  },
              }
            : {
                  primary: {
                      500: "#f5c02e",
                  },
                  secondary: {
                      500: "#ffffff",
                  },
                  accent: {
                      500: "#8cb408",
                  },
                  text: {
                      400: "#ffffff",
                      500: "#808080",
                      600: "#000000",
                  },
                  background: {
                      400: "#ffffff",
                      500: "#f9f2dc",
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
                logo: {
                    fontFamily: "ProspectusProMBlack",
                    fontSize: 60,
                    color: options.colors.text[600],
                },
                h1: {
                    fontFamily:
                        weight === "bold" && style === "italic"
                            ? "LatoBlackItalic"
                            : weight === "bold"
                            ? "LatoBlack"
                            : style === "italic"
                            ? "LatoBoldItalic"
                            : "LatoBold",
                    fontSize: 48,
                    color: options.colors.text[600],
                },
                h2: {
                    fontFamily:
                        weight === "bold" && style === "italic"
                            ? "LatoBlackItalic"
                            : weight === "bold"
                            ? "LatoBlack"
                            : style === "italic"
                            ? "LatoBoldItalic"
                            : "LatoBold",
                    fontSize: 36,
                    color: options.colors.text[600],
                },
                h3: {
                    fontFamily:
                        weight === "bold" && style === "italic"
                            ? "LatoBlackItalic"
                            : weight === "bold"
                            ? "LatoBlack"
                            : style === "italic"
                            ? "LatoBoldItalic"
                            : "LatoBold",
                    fontSize: 30,
                    color: options.colors.text[600],
                },
                h4: {
                    fontFamily:
                        weight === "bold" && style === "italic"
                            ? "LatoBlackItalic"
                            : weight === "bold"
                            ? "LatoBlack"
                            : style === "italic"
                            ? "LatoBoldItalic"
                            : "LatoBold",
                    fontSize: 24,
                    color: options.colors.text[600],
                },
                h5: {
                    fontFamily:
                        weight === "bold" && style === "italic"
                            ? "LatoBlackItalic"
                            : weight === "bold"
                            ? "LatoBlack"
                            : style === "italic"
                            ? "LatoBoldItalic"
                            : "LatoBold",
                    fontSize: 21,
                    color: options.colors.text[600],
                },
                h6: {
                    fontFamily:
                        weight === "bold" && style === "italic"
                            ? "LatoBlackItalic"
                            : weight === "bold"
                            ? "LatoBlack"
                            : style === "italic"
                            ? "LatoBoldItalic"
                            : "LatoBold",
                    fontSize: 18,
                    color: options.colors.text[600],
                },
                subtitle1: {
                    fontFamily:
                        weight === "bold" && style === "italic"
                            ? "LatoBoldItalic"
                            : weight === "bold"
                            ? "LatoBold"
                            : style === "italic"
                            ? "LatoItalic"
                            : "LatoRegular",
                    fontSize: 16,
                    color: options.colors.text[500],
                },
                subtitle2: {
                    fontFamily:
                        weight === "bold" && style === "italic"
                            ? "LatoBlackItalic"
                            : weight === "bold"
                            ? "LatoBlack"
                            : style === "italic"
                            ? "LatoBoldItalic"
                            : "LatoBold",
                    color: options.colors.text[500],
                },
                body1: {
                    fontFamily:
                        weight === "bold" && style === "italic"
                            ? "LatoBlackItalic"
                            : weight === "bold"
                            ? "LatoBlack"
                            : style === "italic"
                            ? "LatoBoldItalic"
                            : "LatoBold",
                    fontSize: 18,
                    color: options.colors.text[600],
                },
                body2: {
                    fontFamily:
                        weight === "bold" && style === "italic"
                            ? "LatoLightItalic"
                            : weight === "bold"
                            ? "LatoLight"
                            : style === "italic"
                            ? "LatoThinItalic"
                            : "LatoThin",
                    color: options.colors.text[600],
                },
            });
        },
    };
};
