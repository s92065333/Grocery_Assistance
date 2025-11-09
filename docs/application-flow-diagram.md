# Smart Grocery Shopping Assistant - Application Flow Diagram

## Complete System Architecture

```mermaid
graph TB
    subgraph "User Interface Layer"
        UI[GroceryApp Component]
        Tab1[Grocery List Tab]
        Tab2[AI Assistant Tab]
        AddForm[AddItemForm]
        ListTable[GroceryListTable]
        ActionPanel[ActionPanel]
        ChatUI[ChatInterface]
    end

    subgraph "Data Management Layer"
        Hook[useGroceryData Hook]
        Actions[actions.ts Server Actions]
    end

    subgraph "Rule-Based Engine"
        RulesEngine[rules-engine.ts]
        RePurchase[evaluateRePurchaseRules]
        Category[evaluateCategoryRules]
        Healthier[evaluateHealthierAlternatives]
        Expiry[evaluateExpiryReminders]
        GetAll[getAllRuleBasedSuggestions]
    end

    subgraph "Rule Storage"
        RulesStorage[rules-storage.ts]
        HealthierRules[Healthier Alternatives Rules<br/>550+ items]
        CategoryRules[Category Associations Rules<br/>150+ items]
        ExpiryRules[Expiry Rules<br/>250+ items]
        CustomRules[Custom Rules]
    end

    subgraph "AI Layer (Optional/Fallback)"
        AI[AI Flows]
        ChatCommand[process-chat-command]
        SuggestRePurchase[AI suggest-re-purchase]
        SuggestHealthier[AI suggest-healthier-alternatives]
        CheckExpiry[AI check-expiring-items]
    end

    subgraph "Data Storage"
        LocalStorage[(localStorage)]
        GroceryListData[Grocery List Data]
        PurchaseHistoryData[Purchase History Data]
        RulesData[Rules Data]
    end

    %% User Interface Flow
    UI --> Tab1
    UI --> Tab2
    Tab1 --> AddForm
    Tab1 --> ListTable
    Tab1 --> ActionPanel
    Tab2 --> ChatUI

    %% Data Flow - User Actions
    AddForm -->|addItem| Hook
    ListTable -->|removeItem/editItem| Hook
    ActionPanel -->|Request Suggestions| Actions
    ChatUI -->|User Message| Actions
    ChatUI -->|addItem/removeItem| Hook

    %% Data Management
    Hook -->|Read/Write| LocalStorage
    Hook -->|Provides Data| Actions
    Actions -->|Get Suggestions| RulesEngine
    Actions -->|Fallback| AI

    %% Rule Engine Flow
    Actions --> GetAll
    GetAll --> RePurchase
    GetAll --> Category
    GetAll --> Healthier
    GetAll --> Expiry

    %% Rule Engine to Rule Storage
    RePurchase -->|Load Rules| RulesStorage
    Category -->|Load Rules| RulesStorage
    Healthier -->|Load Rules| RulesStorage
    Expiry -->|Load Rules| RulesStorage

    %% Rule Storage Details
    RulesStorage --> HealthierRules
    RulesStorage --> CategoryRules
    RulesStorage --> ExpiryRules
    RulesStorage --> CustomRules
    RulesStorage -->|Read/Write| RulesData

    %% AI Flow (Fallback)
    Actions -.->|If no rule-based results| AI
    AI --> ChatCommand
    AI --> SuggestRePurchase
    AI --> SuggestHealthier
    AI --> CheckExpiry

    %% Storage
    LocalStorage --> GroceryListData
    LocalStorage --> PurchaseHistoryData
    LocalStorage --> RulesData

    %% Styling
    classDef uiLayer fill:#e1f5ff,stroke:#01579b,stroke-width:2px
    classDef dataLayer fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef ruleLayer fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px
    classDef aiLayer fill:#fff3e0,stroke:#e65100,stroke-width:2px,stroke-dasharray: 5 5
    classDef storageLayer fill:#fce4ec,stroke:#880e4f,stroke-width:2px

    class UI,Tab1,Tab2,AddForm,ListTable,ActionPanel,ChatUI uiLayer
    class Hook,Actions dataLayer
    class RulesEngine,RePurchase,Category,Healthier,Expiry,GetAll ruleLayer
    class AI,ChatCommand,SuggestRePurchase,SuggestHealthier,CheckExpiry aiLayer
    class LocalStorage,GroceryListData,PurchaseHistoryData,RulesData,RulesStorage,HealthierRules,CategoryRules,ExpiryRules,CustomRules storageLayer
```

## Detailed Process Flow

```mermaid
sequenceDiagram
    participant User
    participant UI as GroceryApp
    participant Hook as useGroceryData
    participant Storage as localStorage
    participant Panel as ActionPanel
    participant Actions as actions.ts
    participant Engine as Rules Engine
    participant Rules as Rules Storage
    participant AI as AI Flows (Fallback)

    %% Adding Item Flow
    User->>UI: Add Item via Form
    UI->>Hook: addItem(name, quantity, ...)
    Hook->>Storage: Save to Grocery List
    Hook->>Storage: Update Purchase History
    Storage-->>Hook: Data Saved
    Hook-->>UI: State Updated
    UI-->>User: Item Added to List

    %% Getting Suggestions Flow
    User->>Panel: Click "Suggest Re-Purchase"
    Panel->>Actions: getRepurchaseSuggestions()
    Actions->>Engine: getAllRuleBasedSuggestions()
    
    %% Rule Engine Processing
    Engine->>Rules: Load Healthier Alternatives
    Engine->>Rules: Load Category Associations
    Engine->>Rules: Load Expiry Rules
    Rules-->>Engine: Return Rule Dictionaries
    
    Engine->>Engine: evaluateRePurchaseRules()
    Note over Engine: IF purchased 5-7 days ago<br/>AND expiry ≤ 7 days<br/>THEN suggest re-purchase
    
    Engine->>Engine: evaluateCategoryRules()
    Note over Engine: IF item in list<br/>THEN suggest associated items
    
    Engine->>Engine: evaluateHealthierAlternatives()
    Note over Engine: IF item matches unhealthy<br/>THEN suggest healthier alternative
    
    Engine->>Engine: evaluateExpiryReminders()
    Note over Engine: IF daysUntilExpiry ≤ 3<br/>THEN show warning
    
    Engine-->>Actions: Return Suggestions
    
    alt Rule-Based Suggestions Found
        Actions-->>Panel: Return Rule-Based Suggestions
    else No Rule-Based Suggestions
        Actions->>AI: Fallback to AI
        AI-->>Actions: Return AI Suggestions
        Actions-->>Panel: Return AI Suggestions
    end
    
    Panel-->>User: Display Suggestions

    %% Chat Interface Flow
    User->>UI: Send Chat Message
    UI->>Actions: processChatCommand()
    Actions->>Engine: Check Rule-Based Suggestions
    Engine-->>Actions: Rule-Based Results
    
    alt Rule-Based Available
        Actions->>AI: Process with AI (Intent Detection)
        AI-->>Actions: Intent + Items
        Actions->>Actions: Merge Rule-Based + AI
        Actions-->>UI: Combined Response
    else AI Only
        Actions->>AI: Full AI Processing
        AI-->>Actions: AI Response
        Actions-->>UI: AI Response
    end
    
    UI-->>User: Display Chat Response
```

## Rule-Based Decision Flow

```mermaid
flowchart TD
    Start([User Requests Suggestion]) --> LoadData[Load Purchase History<br/>& Current Grocery List]
    
    LoadData --> CheckRePurchase{Re-Purchase<br/>Request?}
    LoadData --> CheckHealthier{Healthier<br/>Alternatives?}
    LoadData --> CheckExpiry{Expiry<br/>Reminders?}
    LoadData --> CheckCategory{Category<br/>Associations?}
    
    %% Re-Purchase Rules
    CheckRePurchase -->|Yes| Rule1[Rule 1: Check Purchase Date]
    Rule1 -->|IF purchased 5-7 days ago| Rule1a[AND expiry ≤ 7 days]
    Rule1a -->|THEN| Suggest1[Suggest Re-Purchase]
    
    Rule1 -->|ELSE| Rule2[Rule 2: Check Purchase Frequency]
    Rule2 -->|IF purchased ≥3 times| Rule2a[AND within 14 days]
    Rule2a -->|THEN| Suggest1
    
    %% Healthier Alternatives Rules
    CheckHealthier -->|Yes| Rule3[Load Healthier Alternatives Map<br/>550+ rules]
    Rule3 --> Rule3a{Item matches<br/>unhealthy item?}
    Rule3a -->|Yes| Rule3b[Find healthier alternative]
    Rule3b -->|IF alternative not in list| Suggest2[Suggest Healthier Alternative]
    Rule3a -->|No| NoHealthier[No Healthier Alternative]
    
    %% Category Associations Rules
    CheckCategory -->|Yes| Rule4[Load Category Associations Map<br/>150+ rules]
    Rule4 --> Rule4a{Item has<br/>associations?}
    Rule4a -->|Yes| Rule4b[Check associated items]
    Rule4b -->|IF not in current list| Suggest3[Suggest Associated Items]
    Rule4a -->|No| NoCategory[No Category Suggestions]
    
    %% Expiry Rules
    CheckExpiry -->|Yes| Rule5[Load Expiry Rules Map<br/>250+ rules]
    Rule5 --> Rule5a[Calculate Days Until Expiry]
    Rule5a --> Rule5b{daysUntilExpiry ≤ 0?}
    Rule5b -->|Yes| Critical[CRITICAL: Item Expired]
    Rule5b -->|No| Rule5c{daysUntilExpiry ≤ 3?}
    Rule5c -->|Yes| Warning[WARNING: Expiring Soon]
    Rule5c -->|No| NoExpiry[No Expiry Issues]
    
    %% Combine Results
    Suggest1 --> Combine[Combine All Suggestions]
    Suggest2 --> Combine
    Suggest3 --> Combine
    Critical --> Combine
    Warning --> Combine
    NoHealthier --> Combine
    NoCategory --> Combine
    NoExpiry --> Combine
    
    Combine --> CheckResults{Any<br/>Suggestions?}
    CheckResults -->|Yes| ReturnRules[Return Rule-Based Suggestions]
    CheckResults -->|No| FallbackAI[Fallback to AI<br/>(if enabled)]
    
    ReturnRules --> End([Display Suggestions to User])
    FallbackAI --> End
    
    %% Styling
    classDef ruleBox fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px
    classDef decision fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef suggestion fill:#e1f5ff,stroke:#01579b,stroke-width:2px
    classDef endPoint fill:#f3e5f5,stroke:#4a148c,stroke-width:3px
    
    class Rule1,Rule1a,Rule2,Rule2a,Rule3,Rule3a,Rule3b,Rule4,Rule4a,Rule4b,Rule5,Rule5a,Rule5b,Rule5c ruleBox
    class CheckRePurchase,CheckHealthier,CheckExpiry,CheckCategory,Rule3a,Rule4a,Rule5b,Rule5c,CheckResults decision
    class Suggest1,Suggest2,Suggest3,Critical,Warning suggestion
    class Start,End endPoint
```

## Data Flow Diagram

```mermaid
graph LR
    subgraph "Input Sources"
        UserInput[User Input<br/>- Add Items<br/>- Remove Items<br/>- Edit Items]
        PurchaseHistory[Purchase History<br/>- Item Name<br/>- Purchase Date<br/>- Expiry Days]
        CurrentList[Current Grocery List<br/>- Item Names<br/>- Quantities]
    end

    subgraph "Rule Engine Processing"
        LoadRules[Load Rules from Storage]
        ProcessRules[Apply IF-THEN Rules]
        MatchRules[Match Items to Rules]
    end

    subgraph "Rule Types"
        RePurchaseRule[Re-Purchase Rule<br/>IF: purchased 5-7 days ago<br/>THEN: suggest re-purchase]
        HealthierRule[Healthier Alternative Rule<br/>IF: item = 'white bread'<br/>THEN: suggest 'brown bread']
        CategoryRule[Category Association Rule<br/>IF: item = 'tea'<br/>THEN: suggest 'sugar', 'milk']
        ExpiryRule[Expiry Reminder Rule<br/>IF: daysUntilExpiry ≤ 3<br/>THEN: show warning]
    end

    subgraph "Output"
        Suggestions[Suggestions<br/>- Re-Purchase Items<br/>- Healthier Alternatives<br/>- Category Associations<br/>- Expiry Warnings]
    end

    UserInput --> PurchaseHistory
    UserInput --> CurrentList
    PurchaseHistory --> LoadRules
    CurrentList --> LoadRules
    LoadRules --> ProcessRules
    ProcessRules --> MatchRules
    MatchRules --> RePurchaseRule
    MatchRules --> HealthierRule
    MatchRules --> CategoryRule
    MatchRules --> ExpiryRule
    RePurchaseRule --> Suggestions
    HealthierRule --> Suggestions
    CategoryRule --> Suggestions
    ExpiryRule --> Suggestions

    classDef input fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    classDef process fill:#f1f8e9,stroke:#33691e,stroke-width:2px
    classDef rule fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    classDef output fill:#fce4ec,stroke:#c2185b,stroke-width:2px

    class UserInput,PurchaseHistory,CurrentList input
    class LoadRules,ProcessRules,MatchRules process
    class RePurchaseRule,HealthierRule,CategoryRule,ExpiryRule rule
    class Suggestions output
```

## Component Interaction Diagram

```mermaid
graph TB
    subgraph "Frontend Components"
        GroceryApp[GroceryApp<br/>Main Container]
        AddForm[AddItemForm<br/>Add New Items]
        ListTable[GroceryListTable<br/>Display & Manage List]
        ActionPanel[ActionPanel<br/>Get Suggestions]
        ChatInterface[ChatInterface<br/>AI Chat]
    end

    subgraph "Hooks & State Management"
        useGroceryData[useGroceryData Hook<br/>- groceryList<br/>- purchaseHistory<br/>- addItem<br/>- removeItem<br/>- editItem]
    end

    subgraph "Business Logic"
        actions[actions.ts<br/>Server Actions]
        rulesEngine[rules-engine.ts<br/>Rule Evaluation]
        rulesStorage[rules-storage.ts<br/>Rule Management]
    end

    subgraph "Storage"
        localStorage[(localStorage<br/>Browser Storage)]
    end

    GroceryApp --> AddForm
    GroceryApp --> ListTable
    GroceryApp --> ActionPanel
    GroceryApp --> ChatInterface
    GroceryApp --> useGroceryData

    AddForm -->|addItem| useGroceryData
    ListTable -->|removeItem/editItem| useGroceryData
    ActionPanel -->|Request| actions
    ChatInterface -->|Request| actions
    ChatInterface -->|addItem/removeItem| useGroceryData

    useGroceryData -->|Read/Write| localStorage
    actions -->|Evaluate| rulesEngine
    rulesEngine -->|Load| rulesStorage
    rulesStorage -->|Read/Write| localStorage

    classDef component fill:#bbdefb,stroke:#0d47a1,stroke-width:2px
    classDef hook fill:#c8e6c9,stroke:#1b5e20,stroke-width:2px
    classDef logic fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    classDef storage fill:#f8bbd0,stroke:#880e4f,stroke-width:2px

    class GroceryApp,AddForm,ListTable,ActionPanel,ChatInterface component
    class useGroceryData hook
    class actions,rulesEngine,rulesStorage logic
    class localStorage storage
```

