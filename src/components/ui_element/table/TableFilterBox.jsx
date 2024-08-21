export function TableFilterBox({ subject, search, setSearch }) {
  const handleChangeValue = (value) => {
    setSearch(value);
  };

  return (
    <>
      <th>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={({ currentTarget: input }) =>
            handleChangeValue(input.value)
          }
        />
      </th>
    </>
  );
}
