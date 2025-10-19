# Dark/Light Mode Feature - Documentation

## 🌓 Overview

Added a complete dark/light mode theme system to the STUD platform with a beautiful animated toggle button positioned in the top-right of the navbar. The theme preference persists across page reloads using localStorage.

## ✨ Features

### Theme Toggle Button
- **Location**: Top-right corner of the navbar (desktop and mobile)
- **Design**: Animated sliding toggle with Moon/Sun icons
- **Animation**: Smooth sliding transition with cubic-bezier easing
- **Responsive**: Adapts to mobile screens while maintaining functionality

### Theme System
- **Default Theme**: Dark mode
- **Persistence**: Saves preference to localStorage
- **Smooth Transitions**: 0.3s ease transitions for all theme changes
- **CSS Variables**: Uses CSS custom properties for easy theming

## 🎨 Design Elements

### Toggle Animation
- **Track**: 64px × 32px rounded pill
- **Thumb**: 24px circular button that slides
- **Icons**: 
  - Moon icon (dark mode) - white color
  - Sun icon (light mode) - gray color
- **Hover Effect**: Scale 1.05 transform
- **States**:
  - Dark: Thumb at left, dark background (#18181b)
  - Light: Thumb slides right (32px), white background

### Color Scheme

#### Light Mode Variables
```css
--color-background: #ffffff
--color-background-secondary: #f8f9fa
--color-text-dark: #1a1a1a
--color-text-light: #6c757d
--color-white: #ffffff
--color-gray-light: #f1f3f5
--color-gray-medium: #dee2e6
--color-border: #e5e7eb
```

#### Dark Mode Variables
```css
--color-background: #0f0f0f
--color-background-secondary: #1a1a1a
--color-text-dark: #f5f5f5
--color-text-light: #a1a1aa
--color-white: #18181b
--color-gray-light: #27272a
--color-gray-medium: #3f3f46
--color-border: #27272a
```

## 🔧 Technical Implementation

### Files Created

1. **`src/context/ThemeContext.jsx`**
   - React Context for global theme state
   - Manages localStorage persistence
   - Provides `useTheme()` hook
   - Applies `data-theme` attribute to `<html>`

2. **`src/components/ThemeToggle.jsx`**
   - Main toggle component
   - Uses Moon and Sun icons from lucide-react
   - Smooth animations with CSS transitions
   - Keyboard accessible (Enter key support)

3. **`src/components/ThemeToggle.css`**
   - Complete styling for toggle button
   - Animation keyframes
   - Responsive mobile styles
   - Hover and active states

### Files Modified

1. **`src/App.jsx`**
   - Wrapped entire app with `<ThemeProvider>`
   - Enables theme context throughout the app

2. **`src/App.css`**
   - Added CSS custom properties for both themes
   - Root element transitions
   - Theme-aware background and text colors

3. **`src/components/Navbar.jsx`**
   - Imported and integrated ThemeToggle
   - Added theme toggle to navbar layout

4. **`src/components/Navbar.css`**
   - Positioned theme toggle in top-right
   - Responsive positioning for mobile
   - Maintains navbar center alignment

## 🎯 Usage

### For Users
1. Look at the top-right corner of the navbar
2. Click the toggle button to switch themes
3. Theme preference is automatically saved
4. Refresh the page - your theme choice persists!

### For Developers

**Access theme in any component:**
```javascript
import { useTheme } from '../context/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      Current theme: {theme}
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
}
```

**Use CSS variables in styles:**
```css
.my-element {
  background-color: var(--color-background);
  color: var(--color-text-dark);
  border: 1px solid var(--color-border);
}
```

## 📱 Responsive Behavior

### Desktop (>768px)
- Toggle positioned absolute right: 2rem
- Full 64px × 32px size
- Shows both Moon and Sun icons

### Mobile (≤768px)
- Toggle positioned absolute right: 1rem
- Smaller 56px × 28px size
- Icons scale to 14px
- Maintains full functionality

## 🔄 Theme Switching Flow

1. **User clicks toggle**
2. `toggleTheme()` called in ThemeContext
3. Theme state updates (dark ↔ light)
4. `data-theme` attribute applied to `<html>`
5. CSS variables update automatically
6. Preference saved to localStorage
7. All components re-render with new theme

## 🎨 Integration Examples

### Example 1: Theme-aware component
```javascript
function Card() {
  return (
    <div style={{
      backgroundColor: 'var(--color-white)',
      color: 'var(--color-text-dark)',
      border: '1px solid var(--color-border)'
    }}>
      This card adapts to the theme!
    </div>
  );
}
```

### Example 2: Conditional styling
```javascript
import { useTheme } from '../context/ThemeContext';

function MyButton() {
  const { theme } = useTheme();
  
  return (
    <button className={theme === 'dark' ? 'btn-dark' : 'btn-light'}>
      Click me
    </button>
  );
}
```

## 🚀 Future Enhancements

### Phase 1: Extended Theming
- [ ] Add more color themes (blue, purple, green)
- [ ] System preference detection (prefers-color-scheme)
- [ ] Auto-switch based on time of day
- [ ] High contrast mode for accessibility

### Phase 2: Advanced Features
- [ ] Custom theme builder
- [ ] User-saved theme presets
- [ ] Theme preview before switching
- [ ] Smooth crossfade animations
- [ ] Per-page theme overrides

### Phase 3: Integration
- [ ] Theme-aware syntax highlighting
- [ ] Dark mode optimized images
- [ ] Video player theme matching
- [ ] Chart/graph theme synchronization

## ♿ Accessibility

- **Keyboard Support**: Toggle activates on Enter key
- **ARIA Labels**: Descriptive labels for screen readers
- **Focus States**: Clear focus indicators
- **Color Contrast**: WCAG AA compliant in both modes
- **Reduced Motion**: Respects user motion preferences

## 💡 Best Practices

### When Adding New Components
1. Use CSS custom properties for colors
2. Test in both light and dark modes
3. Ensure sufficient contrast ratios
4. Avoid hardcoded colors

### When Styling
```css
/* ✅ Good - Uses theme variables */
.my-component {
  background: var(--color-background);
  color: var(--color-text-dark);
}

/* ❌ Bad - Hardcoded colors */
.my-component {
  background: #ffffff;
  color: #000000;
}
```

## 🐛 Troubleshooting

### Theme not switching?
- Check browser console for errors
- Verify ThemeProvider wraps your app
- Check localStorage permissions

### Styles not updating?
- Make sure you're using CSS variables
- Check CSS specificity issues
- Clear browser cache

### Toggle not visible?
- Check z-index conflicts
- Verify navbar positioning
- Inspect CSS for display: none

## 📊 Browser Support

- ✅ Chrome/Edge 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Opera 74+
- ⚠️ IE11: Not supported (uses CSS variables)

## 🎓 Impact

This theme system provides:
- **Better UX**: Users can choose their preferred viewing mode
- **Reduced Eye Strain**: Dark mode for low-light environments
- **Accessibility**: Supports user preferences and needs
- **Modern Design**: Polished, professional appearance
- **Energy Saving**: Dark mode uses less power on OLED screens

---

**Implementation Date**: October 20, 2025  
**Feature Status**: ✅ Active  
**Location**: Top-right corner of navbar  
**Default Theme**: Dark mode  
**Persistence**: localStorage

## 🖼️ Visual Guide

### Light Mode
```
┌─────────────────────────────────────────┐
│  [STUD] ───── Navbar ───── [☀️ 🌙]    │
│                              ↑          │
│                         Theme Toggle    │
└─────────────────────────────────────────┘
Background: White (#ffffff)
Text: Dark (#1a1a1a)
Toggle: Sun icon visible (right position)
```

### Dark Mode
```
┌─────────────────────────────────────────┐
│  [STUD] ───── Navbar ───── [🌙 ☀️]    │
│                              ↑          │
│                         Theme Toggle    │
└─────────────────────────────────────────┘
Background: Dark (#0f0f0f)
Text: Light (#f5f5f5)
Toggle: Moon icon visible (left position)
```

## 🔧 Maintenance

### Regular Updates
- Monitor user theme preferences (analytics)
- Test new components in both modes
- Update CSS variables as design evolves
- Ensure accessibility standards met

### Testing Checklist
- ✅ Toggle switches themes
- ✅ Theme persists on reload
- ✅ All pages render correctly
- ✅ No console errors
- ✅ Mobile responsive
- ✅ Keyboard accessible
- ✅ Smooth animations
- ✅ Icons display correctly
