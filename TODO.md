# 🍍 Pineapple Cake

## TODO

#### 🚨 Issues to Fix

- [x] Type updates  
       _Update remaining types: `PlayerToken.playerId` → `PlayerToken.id`, `ScanResult.playerId` → `ScanResult.id`._
- [x] Scan endpoint error message  
       _Change from "playerId and barcode required" to "id and barcode required"._
- [ ] Update ItemCard width
      _overlaps when only one in two column grid_
- [x] Complete collectable LocalStorage  
       _When a Player views the Items page, check LocalStorage.COLLECTABLE for the collectableId first. If it doesn't exist, fetch the collectable from the API and store it._

#### ✨ Feature Implementation

- [ ] Remove UI Kitten  
       _Refactor app to remove UI Kitten dependency and use styled-components for all styling._
- [ ] Create dedicated components  
       _Build and organize separate React Native components for each visual/function block (e.g., ItemCard, Profile, AchievementList, NotificationItem, etc.)._
- [ ] Item detail view  
       _Show detailed view when an item card is pressed._
- [ ] Search implementation  
       _Wire up search input for full list filtering in the UI._
- [ ] Notifications UI  
       _Display notifications pulled from the backend. Show unread counts, view/read details._
- [ ] Closing eye like animation
      _When scanning a barcode close the camera view with an eye blink animation_
- [ ] Tab switch animation
      _Slide from tab to tab animation_
- [ ] ItemsFilter functionality  
       _Connect filter UI to real filtering logic for items list._

#### 🔄 App–Backend Consistency

- [ ] Unified API response fields  
       _Ensure Item schema includes both `playerId` and `collectableId` fields. Update all usages to expect and handle `id`/`playerId`/`collectableId` consistently, matching backend responses._
- [ ] Schema alignment  
       _Verify all components/readers use the updated schema consistently throughout the app._
- [ ] Profile fields sync  
       _Display and allow editing (where allowed) of new Player profile fields (bio, stats, etc.) added on the backend._
- [ ] Achievements sync  
       _Fetch and display player's achievements array. Cache achievement catalog locally for fast lookups. Update UI when user earns achievements._
- [ ] Favourites sync  
       _Support displaying and toggling the 'favourite' status on player's owned items. Sync with new backend item field._

#### 🧪 Testing & Polish

- [ ] Test item loading  
       _Verify consistency of item data with cache and API interaction._
- [ ] Test empty states  
       _Proper messaging/UI when lists are empty/filtered out._
- [ ] Performance: Pagination  
       _Add pagination or infinite scroll for large lists._
- [ ] Error boundaries  
       _Add component-level error boundaries for resilient UI._

#### 📚 Documentation & Dev Experience

- [ ] Update API documentation  
       _Docs must match new parameter names and response structures._
- [ ] JSDoc component comments  
       _Add/refresh JSDoc for new and updated components._
- [ ] Implement Storybook  
       _Install and set up [Storybook](https://github.com/storybookjs/react-native) for UI and component previews._
