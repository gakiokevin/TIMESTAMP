# Date API

## Overview

This API accepts a date in a specified format and returns a JSON object containing the UTC time in both UNIX timestamp and the requested format.

## Usage

### Endpoint

- **URL:** `/api/:date`
- **Method:** GET

### Parameters

- `date`: The input date in the specified format.

### Example

#### Request

```http
GET /api/2023-03-15T12:30:00
