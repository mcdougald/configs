# @mcdougald/hooks

Reusable React hooks that I rely on across personal and open-source projects.

## Installation

Install the package alongside the required peer dependencies:

```bash
pnpm add @mcdougald/hooks react react-dom
```

## Usage

Import the hooks you need directly from the package:

```tsx
import { useDebouncedCallback, useEvent, useIsMounted } from '@mcdougald/hooks';

const SearchInput = () => {
  const [query, setQuery] = useState('');

  const debouncedSearch = useDebouncedCallback((value: string) => {
    // Trigger a side-effect after the user stops typing
    void fetch(`/api/search?q=${value}`);
  }, 250);

  const handleChange = useEvent((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    debouncedSearch(value);
  });

  return <input value={query} onChange={handleChange} />;
};
```

## Available Hooks

- `useDebouncedCallback(handler, delay)` – creates a stable callback that waits for the user to stop invoking it before running.
- `useEvent(handler)` – returns a event-stable function that always references the latest handler without re-subscribing.
- `useIsMounted()` – returns a function that lets you check if the component is currently mounted.
- `useIsomorphicLayoutEffect` – `useLayoutEffect` on the client and `useEffect` on the server.

More hooks will be added over time. Contributions and ideas are welcome through issues or pull requests.

## License

[MIT](../../LICENSE)
