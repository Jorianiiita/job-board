import { render, fireEvent } from '@testing-library/react';
import NormalTabs from '../NormalTabs';

describe('Normal Tabs', () => {
  let component;
  beforeEach(() => {
    component = render(<NormalTabs />);
  });

  it('renders tabs with correct content and switches tabs correctly', () => {
    // Default tab 1
    // Check if the default tab is rendered with its content
    expect(component.getByText('Tab 1')).toHaveClass('active');
    // Check if the default tab is rendered with its content
    expect(component.getByText('Form')).toBeInTheDocument();
    expect(component.queryByText('Content 2')).not.toBeInTheDocument();
    expect(component.queryByText('Content 3')).not.toBeInTheDocument();
    expect(component.queryByText('Content 4')).not.toBeInTheDocument();

    // Switch to tab 2
    fireEvent.click(component.getByText('Tab 2'));
    // Check if tab 2 content is rendered and has the 'active' class
    expect(component.getByText('Content 2')).toBeInTheDocument();
    expect(component.getByText('Tab 2')).toHaveClass('active');
    // Check if tab 2 content is rendered
    expect(component.getByText('Content 2')).toBeInTheDocument();
    expect(component.queryByText('Form')).not.toBeInTheDocument();
    expect(component.queryByText('Content 3')).not.toBeInTheDocument();
    expect(component.queryByText('Content 4')).not.toBeInTheDocument();

    // Switch to tab 3
    fireEvent.click(component.getByText('Tab 3'));

    // Check if tab 3 content is rendered
    expect(component.getByText('Content 3')).toBeInTheDocument();
    expect(component.queryByText('Form')).not.toBeInTheDocument();
    expect(component.queryByText('Content 2')).not.toBeInTheDocument();
    expect(component.queryByText('Content 4')).not.toBeInTheDocument();

    fireEvent.click(component.getByText('Tab 4'));

    // Check if tab 4 content is rendered
    expect(component.getByText('Content 4')).toBeInTheDocument();
    expect(component.queryByText('Form')).not.toBeInTheDocument();
    expect(component.queryByText('Content 2')).not.toBeInTheDocument();
    expect(component.queryByText('Content 3')).not.toBeInTheDocument();
  });
});
