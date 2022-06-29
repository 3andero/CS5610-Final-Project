import { render, screen } from '@testing-library/react';
import { AppContext } from 'context/app-context';
import { ReactNode } from 'react';
import { IndexPageView } from 'view/index-page';

jest.mock("@auth0/auth0-react", () => ({
    Auth0Provider: ({ children }: { children: ReactNode }) => children,
    useAuth0: () => {
        return {
            isLoading: false,
            isAuthenticated: true,
            getAccessTokenSilently: () => "succeed"
        };
    },
}));

test('renders cart title', () => {
    render(<IndexPageView />, { wrapper: AppContext });
    // screen.debug();
    const titleElement = screen.getByRole('button', { name: /discover the offer/i });
    expect(titleElement).toBeInTheDocument();
});
