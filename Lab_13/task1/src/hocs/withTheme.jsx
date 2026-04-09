import React from 'react';
import ThemeContext from '../contexts/ThemeContext';

function getDisplayName(WrappedComponent) {
    return WrappedComponent.desplayName || WrappedComponent.name || 'Component';
};


export function withTheme(WrappedComponent) {
    function WithTheme(props) {
        return (
            <ThemeContext.Consumer>
                {(themeContext) => {
                    if (themeContext === undefined) {
                        throw new Error('withTheme must be used within a ThemeProvider');
                    };

                    const { theme, isDark, toggleTheme } = themeContext;
                    return (
                        <WrappedComponent
                            {...props}
                            theme = { theme }
                            isDark = { isDark }
                            toggleTheme = { toggleTheme }
                        />
                    );
                }};
            </ThemeContext.Consumer>
        );
    };


    WithTheme.displayName = `WithTheme(${getDisplayName(WrappedComponent)})`;

    return WithTheme;
};


export function withStyles(WrappedComponent, getStyles) {
    function WithStyles(props) {
        return (
            <ThemeContext.Consumer>
                {(themeContext) => {
                    if (themeContext === undefined) {
                        throw new Error('withStyles must be used within a ThemeProvider');
                    };

                    const { theme, isDark, toggleTheme } = themeContext;
                    const styles = typeof getStyles === 'function'
                        ? getStyles(theme, props)
                        : getStyles;
                    return (
                        <WrappedComponent 
                            {...props}
                            theme = {theme}
                            isDark = {isDark}
                            toggleTheme = {toggleTheme}
                            styles = {styles}
                        />
                    );
                }};
            </ThemeContext.Consumer>
        );
    };

    WithStyles.displayName = `WithStyles(${getDisplayName(WrappedComponents)})`;

    return WithStyles;
}

export default withTheme;