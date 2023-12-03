### AVATARS
| Data     | Type    | Spécificités        |
| -------- | ------- | ------------------- |
| id       | UUID    | DEFAULT PRIMARY KEY |
| url      | TEXT    | NOT NULL            |

## USERS
| Data      | Type    | Spécificités        |
| --------  | ------- | ------------------- |
| id        | UUID    | DEFAULT PRIMARY KEY |
| lastname  | TEXT    | NOT NULL            |
| firstname | TEXT    | NOT NULL            |
| email     | TEXT    | NOT NULL UNIQUE     |
| password  | TEXT    | NOT NULL            |

## DEBTORS
| Data      | Type    | Spécificités        |
| --------  | ------- | ------------------- |
| id        | UUID    | DEFAULT PRIMARY KEY |
| lastname  | TEXT    | NOT NULL            |
| firstname | TEXT    | NOT NULL            |
| email     | TEXT    |                     |
| phone     | TEXT    |                     |
| date      | DATE    | NOT NULL            |

## STATUS
| Data      | Type    | Spécificités        |
| --------  | ------- | ------------------- |
| id        | UUID    | DEFAULT PRIMARY KEY |
| name      | TEXT    | NOT NULL            |

## INVOICES
| Data      | Type    | Spécificités        |
| --------  | ------- | ------------------- |
| id        | UUID    | DEFAULT PRIMARY KEY |
| name      | TEXT    | NOT NULL            |
| amount    | INT     | NOT NULL            |
| date      | DATE    | NOT NULL            |

## REFUNDS
| Data      | Type    | Spécificités        |
| --------  | ------- | ------------------- |
| id        | UUID    | DEFAULT PRIMARY KEY |
| source    | TEXT    | NOT NULL            |
| amount    | INT     | NOT NULL            |
| date      | DATE    | NOT NULL            |

## RELAUNCH
| Data      | Type    | Spécificités        |
| --------  | ------- | ------------------- |
| id        | UUID    | DEFAULT PRIMARY KEY |
| comment   | TEXT    | NOT NULL            |
| date      | DATE    | NOT NULL            |
