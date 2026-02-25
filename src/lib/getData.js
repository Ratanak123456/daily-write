export async function getData() {
    const response = await fetch("https://blog-api.bykh.org/api/v100/blogs",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkZTFhNWU0ZS0xYzY0LTQ5OTUtODk5MC0wMmNhYmE3Yjc3NjMiLCJyb2xlcyI6WyJVU0VSIiwiRkFDVE9SX1BBU1NXT1JEIl0sImlhdCI6MTc3MTkyNjg0OCwiZXhwIjoxNzcxOTMwNDQ4fQ.S4M31uSzwbwsbkvGzKTd-5JtW1X9gZ0tEr4aPD3jWUAJgMaMIyi29WwBlvKluDWho8BHi9tIwqK9lwmnBGxq3ipoJTLjOdSWqv1Lzt_pqFTiqCf5nQR0BWfcI7M39n13pD_ewlzRMRSmdvU7MxNCPWXlAQeCWAMs7tm-ZvVj7pmZHOB8GMyHwc2RCCs6ewxGZUsA36prLsR0WyV9SvuTkOySYkcgjKVU-d1oCJ7QMBCTlnOYTmdFgpVzut53Al4C9OHT4JA_LJ7kMkYQH9velZTxKx1JTh4T9P6VGosmOho0M_8bJEw7ExzcOXoO1TyLQvK75HxlHJhylHH_J411Aw`
        }
    });
    const data = await response.json();
    return data;
}