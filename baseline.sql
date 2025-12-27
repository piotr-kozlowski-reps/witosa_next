
[-] Removed enums
  - ActivityType
  - Day
  - EventType
  - ForWhom
  - Place
  - UserRole

[-] Removed tables
  - CyclicalActivity
  - CyclicalActivityOccurrence
  - Event
  - ImageCyclicalActivity
  - ImageEvent
  - Newsletter
  - User

[*] Changed the `CyclicalActivity` table
  [-] Removed foreign key on columns (authorId)

[*] Changed the `CyclicalActivityOccurrence` table
  [-] Removed foreign key on columns (cyclicalActivityId)

[*] Changed the `Event` table
  [-] Removed foreign key on columns (authorId)

[*] Changed the `ImageCyclicalActivity` table
  [-] Removed foreign key on columns (cyclicalActivityId)

[*] Changed the `ImageEvent` table
  [-] Removed foreign key on columns (eventId)

