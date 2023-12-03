## STATUS
| Data      | Type    | Spécificités        |
| --------  | ------- | ------------------- |
| id        | UUID    | DEFAULT PRIMARY KEY |
| name      | TEXT    | NOT NULL            |

## AVATARS
| Data     | Type    | Spécificités        |
| -------- | ------- | ------------------- |
| id       | UUID    | DEFAULT PRIMARY KEY |
| url      | TEXT    | NOT NULL            |

## USERS
| Data      | Type    | Spécificités                          |
| --------  | ------- | ------------------------------------- |
| id        | UUID    | DEFAULT PRIMARY KEY                   |
| lastname  | TEXT    | NOT NULL                              |
| firstname | TEXT    | NOT NULL                              |
| email     | TEXT    | NOT NULL UNIQUE                       |
| password  | TEXT    | NOT NULL                              |
| avatar_id | UUID    | NOT NULL REFERENCES "avatars" ("id")  |

## DEBTORS
| Data      | Type    | Spécificités                         |
| --------  | ------- | ------------------------------------ |
| id        | UUID    | DEFAULT PRIMARY KEY                  |
| lastname  | TEXT    | NOT NULL                             |
| firstname | TEXT    | NOT NULL                             |
| email     | TEXT    |                                      |
| phone     | TEXT    |                                      |
| date      | DATE    | NOT NULL                             |
| user_id   | UUID    | NOT NULL REFERENCES "users" ("id")   |
| status_id | UUID    | NOT NULL REFERENCES "status" ("id")  |

## INVOICES
| Data      | Type                | Spécificités                         |
| --------  | ------------------- | ------------------------------------ |
| id        | UUID                | DEFAULT PRIMARY KEY                  |
| name      | TEXT                | NOT NULL                             |
| amount    | DECIMAL (19, 2)     | NOT NULL                             |
| date      | DATE                | NOT NULL                             |
| debtor_id | UUID                | NOT NULL REFERENCES "debtors" ("id") |

## REFUNDS
| Data      | Type                | Spécificités                          |
| --------  | ------------------- | ------------------------------------- |
| id        | UUID                | DEFAULT PRIMARY KEY                   |
| source    | TEXT                | NOT NULL                              |
| amount    | DECIMAL (19, 2)     | NOT NULL                              |
| date      | DATE                | NOT NULL                              |
| debtor_id | UUID                | NOT NULL REFERENCES "debtors" ("id")  |

## REMINDERS
| Data      | Type    | Spécificités                          |
| --------  | ------- | ------------------------------------- |
| id        | UUID    | DEFAULT PRIMARY KEY                   |
| comment   | TEXT    | NOT NULL                              |
| date      | DATE    | NOT NULL                              |
| debtor_id | UUID    | NOT NULL REFERENCES "debtors" ("id")  |

