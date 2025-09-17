# Frontend Department - React/Next.js Standards

## Component Architecture Standards

### Component Composition
```typescript
// ✅ Good: Composition over inheritance
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  children,
  onClick,
  disabled = false
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};
```

### State Management
```typescript
// ✅ Good: Local state for component-specific data
const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);

  // ✅ Good: Custom hooks for complex logic
  const { user, loading, error } = useUser();
  const { updateUser } = useUserMutations();

  return (
    // Component implementation
  );
};

// ✅ Good: Context for shared state
const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### Performance Optimization
```typescript
// ✅ Good: Memoization for expensive calculations
const DataVisualization = React.memo(({ data, filters }) => {
  const processedData = useMemo(() => {
    return data
      .filter(item => filters.includes(item.category))
      .map(item => calculateMetrics(item));
  }, [data, filters]);

  const handleFilterChange = useCallback((newFilters) => {
    onFiltersChange(newFilters);
  }, [onFiltersChange]);

  return <Chart data={processedData} onFilterChange={handleFilterChange} />;
});
```

## TypeScript Standards

### Interface Design
```typescript
// ✅ Good: Comprehensive interface definitions
interface User {
  readonly id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'moderator';
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    profileVisible: boolean;
    dataSharing: boolean;
  };
}

// ✅ Good: Generic types for reusability
interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
  errors?: ValidationError[];
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
```

### Hook Typing
```typescript
// ✅ Good: Properly typed custom hooks
interface UseApiOptions {
  enabled?: boolean;
  refetchInterval?: number;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

function useApi<T>(
  endpoint: string,
  options: UseApiOptions = {}
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Implementation...

  return { data, loading, error, refetch };
}
```

## Testing Standards

### Component Testing
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserProfile } from './UserProfile';

describe('UserProfile', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user' as const
  };

  it('should display user information correctly', () => {
    render(<UserProfile user={mockUser} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('should handle edit mode toggle', async () => {
    const user = userEvent.setup();
    render(<UserProfile user={mockUser} />);

    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);

    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
  });

  it('should handle form submission', async () => {
    const mockOnUpdate = jest.fn();
    const user = userEvent.setup();

    render(<UserProfile user={mockUser} onUpdate={mockOnUpdate} />);

    // Enter edit mode and update name
    await user.click(screen.getByRole('button', { name: /edit/i }));
    await user.clear(screen.getByRole('textbox', { name: /name/i }));
    await user.type(screen.getByRole('textbox', { name: /name/i }), 'Jane Doe');
    await user.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith({
        ...mockUser,
        name: 'Jane Doe'
      });
    });
  });
});
```

### Hook Testing
```typescript
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('should initialize with custom value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  it('should increment count', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
```

## Error Handling Standards

### Error Boundaries
```typescript
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
    // Log to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <details>
            {this.state.error?.message}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Async Error Handling
```typescript
// ✅ Good: Comprehensive error handling
const useAsyncOperation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async (operation: () => Promise<any>) => {
    try {
      setLoading(true);
      setError(null);

      const result = await operation();
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);

      // Log error for monitoring
      console.error('Async operation failed:', error);

      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, loading, error };
};
```

## Performance Standards

### Bundle Optimization
```typescript
// ✅ Good: Code splitting with React.lazy
const Dashboard = React.lazy(() => import('./Dashboard'));
const UserSettings = React.lazy(() => import('./UserSettings'));

const App = () => (
  <Router>
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<UserSettings />} />
      </Routes>
    </Suspense>
  </Router>
);

// ✅ Good: Dynamic imports for large libraries
const handleExportData = async () => {
  const { saveAs } = await import('file-saver');
  const { utils, writeFile } = await import('xlsx');

  // Use libraries...
};
```

### Memory Management
```typescript
// ✅ Good: Cleanup in useEffect
const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onmessage = (event) => {
      setMessages(prev => [...prev, event.data]);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [url]);

  return { socket, messages };
};
```

This guide ensures consistent, maintainable, and performant React/Next.js development across all frontend implementations.