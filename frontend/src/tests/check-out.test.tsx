import { render, screen } from '@testing-library/react';
import { AppContext } from 'context/app-context';
import { ReactNode } from 'react';
import { CheckOutView } from 'view/check-out';

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



test('renders place an order button', () => {
    render(<CheckOutView />, { wrapper: AppContext });
    const titleElement = screen.getByRole('button', { name: /place an order/i });
    expect(titleElement).toBeInTheDocument();
});