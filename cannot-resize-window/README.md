# Cannot resize window

Cannot change window size on Windows.

## Reproduction conditions:

1. Under Windows
2. Window's decoration is set to false
3. The data-tauri-drag-region attribute is used in the DOM element at the top edge of the window

## Screenshot

https://github.com/yetone/tauri-bug-reproducer/assets/1206493/fa5a4c84-4e57-4b02-9e19-8d9153d004b7

## Related issue and PR:

https://github.com/tauri-apps/tauri/issues/9023

## How to start

```bash
pnpm install
pnpm tauri dev
```
