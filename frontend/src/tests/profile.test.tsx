import { render, screen } from '@testing-library/react';
import { UpdateProfile } from 'components/update-profile';
import { ReactNode } from 'react';

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
    render(<UpdateProfile />);
    const logOutButton = screen.getByRole('button', { name: /logout/i });
    expect(logOutButton).toBeInTheDocument();
});