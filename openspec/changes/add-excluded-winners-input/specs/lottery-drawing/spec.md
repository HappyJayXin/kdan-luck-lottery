## ADDED Requirements

### Requirement: 手動排除中獎名單

The system SHALL allow users to manually input a list of excluded winners in comma-separated format. These excluded winners SHALL be automatically removed from the lottery pool during drawing, regardless of whether they appear in the lottery list.

系統**必須**允許使用者以逗號分隔的格式，手動輸入一份「排除中獎名單」（不應被抽中的人）。在抽獎時，這些被排除的人員**必須**自動從抽獎池中移除，**不論**他們是否出現在抽獎名單中。

#### Scenario: 使用者輸入排除中獎名單
- **WHEN** 使用者在「排除中獎名單」的輸入框中輸入以逗號分隔的姓名（例如：「張三, 李四, 王五」）
- **THEN** 系統會將這些姓名儲存在 `excludedWinnersList` 狀態中
- **AND** 這些姓名會顯示在「已中獎名單」區塊中

#### Scenario: 抽獎時移除排除名單
- **WHEN** 啟動抽獎
- **AND** `excludedWinnersList` 內含姓名
- **THEN** 在抽獎前，系統會先將這些姓名從可抽獎名單中移除
- **AND** 即使這些姓名存在於抽獎名單中，也**不得**被選為中獎者

#### Scenario: 排除名單與重複移除選項同時生效
- **WHEN** `excludedWinnersList` 與 `isRemovedDuplicated` 皆為啟用狀態
- **AND** 啟動抽獎
- **THEN** 系統會同時移除「手動排除的中獎者」與「先前已中獎者」
- **AND** 系統會在過濾前合併這兩份排除名單

#### Scenario: 複製排除中獎名單
- **WHEN** 使用者在「已中獎名單」區塊點擊複製按鈕
- **THEN** 排除中獎名單會以逗號分隔的格式複製到剪貼簿（例如：「張三, 李四, 王五」）
- **AND** 複製按鈕會顯示視覺回饋（停用狀態 1 秒）

### Requirement: 排除中獎名單的 UI 顯示

The system SHALL display an "已中獎名單（排除）" section in the NameList component with a copy button, but SHALL NOT display the full list of excluded winners.

系統**必須**在 `NameList` 元件中顯示一個「已中獎名單」區塊，用來呈現使用者手動輸入的排除中獎名單，並提供複製按鈕；但**不得**顯示完整的姓名清單（僅提供複製功能）。

#### Scenario: 顯示排除中獎名單區塊
- **WHEN** `NameList` 元件被渲染時
- **THEN** 在「抽獎名單」區塊下方顯示一個「已中獎名單」區塊
- **AND** 該區塊包含標題與一個複製按鈕（當名單不為空時）
- **AND** 該區塊**不會**以個別項目方式顯示完整的排除中獎者名單
