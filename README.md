# OpenPay Peru Integration Guide

This repository serves as a comprehensive guide for integrating OpenPay services within Peruvian markets. It is designed to facilitate developers by providing a custom wrapper component that simplifies the process of dynamically loading OpenPay scripts on the client side. To enhance the development experience further, the repository includes module declarations for OpenPay functionalities, alongside detailed TypeScript definitions for various types. This initiative aims to streamline the integration process, ensuring a smoother development workflow when incorporating OpenPay's payment solutions into your projects. Currently, this project is a work in progress (WIP), with ongoing efforts to expand and refine the resources available.

## Features

- **Custom Hook (`useOpenPay`)**: A React hook designed to abstract and simplify the integration of OpenPay's JavaScript libraries. It handles script loading, initialization, and cleanup, providing a clean and straightforward way to incorporate OpenPay into your React applications.
- **Error and Loading Management**: The hook also manages loading states and error handling, which enhances the user interface by providing feedback on the initialization process and potential issues during the setup.
- **Dynamic Script Management**: The hook dynamically loads the necessary OpenPay scripts (`openpay.v1.min.js` and `openpay-data.v1.min.js`) when the component mounts and ensures these scripts are removed when the component unmounts to avoid duplicates and potential memory leaks.

## Getting Started

1. **Installation**
  To integrate OpenPay into your project, start by cloning this repository:
  ```bash
    git clone https://github.com/your-repository/openpay-peru-integration.git
  ```

2 **Usage**
  - Import the `useOpenPay` hook from the `useOpenPay` module:
  ```typescript
    import { useOpenPay } from './useOpenPay';
  ```

  - Use the `useOpenPay` hook in your component:
  ```typescript
    const { loading, error } = useOpenPay({
      merchantId: 'your-merchant-id',
      apiKey: 'your-api-key',
      sandboxMode: true,
    });
  ```

3 **Example**
  - Create a new file called `OpenPayComponent.tsx` in your project.
  - Import the `useOpenPay` hook and the `OpenPayComponent` component from the `openpay-peru-integration` package:
  ```typescript
    import { useOpenPay } from 'openpay-peru-integration';
    import { OpenPayComponent } from 'openpay-peru-integration';
  ```

  - Define the component's props:
  ```typescript
    interface OpenPayProps {
      merchantId: string;
      apiKey: string;
      productionMode: boolean;
    }
  ```

  - Define the component's state:
  ```typescript
    interface OpenPayState {
      loading: boolean;
      error: string | null;
    }
  ```

  - Define the component:
  ```typescript
    const OpenPayComponent: React.FC<OpenPayProps> = ({ merchantId, apiKey, productionMode }) => {
      const { loading, error } = useOpenPay({ merchantId, apiKey, productionMode });

      return (
        <div>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
        </div>
      );
    };
  ```

  - Export the component:
  ```typescript
    export default OpenPayComponent;
  ``` 