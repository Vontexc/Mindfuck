# Task 07 — Steam Integration

## Current state
`src/main/steamworks.ts` dynamically imports `greenworks`. If the native module is missing (dev or non-Steam builds), it falls back to OS username.

## TODO
1. Drop the platform-specific greenworks binary into `./native/greenworks/`.
2. Add `steam_appid.txt` next to the executable with the Steam App ID.
3. Define achievements (see list below) and call `unlockAchievement('id')` from the engine.
4. Wire up Steam Cloud sync — the saves are already in `app.getPath('userData')`, so enabling Auto-Cloud in Steamworks is usually sufficient.
5. Configure depot in Steamworks backend.

## Suggested achievements
| ID                    | Trigger                                                    |
|-----------------------|------------------------------------------------------------|
| `EROEFFNUNG`          | Reach end of Chapter 1.                                    |
| `ECHO_GESEHEN`        | Echo Log activates in Chapter 4.                           |
| `ENDING_A`            | Reach Ending A.                                            |
| `ENDING_B`            | Reach Ending B.                                            |
| `ENDING_C`            | Reach Ending C (closed window during countdown).           |
| `ENDING_D`            | Reach Ending D.                                            |
| `ENDING_E`            | Reach Ending E.                                            |
| `ENDING_F`            | Reach Ending F (ARG).                                      |
| `UNTERSCHIED_GEFUNDEN`| Spot the changed line after Ending A → restart.            |
| `ALLES_GESEHEN`       | Reach all 6 endings.                                       |
