import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { DOMHelper, Panel, Pagination } from "rsuite";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "./People.css";

const { getHeight } = DOMHelper;
const { getWidth } = DOMHelper;

const People = () => {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [sortColumn, setSortColumn] = useState("");
  const [sortType, setSortType] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/people?page=" + page)
      .then(resp => {
        return resp.json();
      }).then(data => {
        setCount(data.count);
        setData(data.results);
        setLoading(false);
      }).catch(err => {
        console.log(err);
      });
  }, [page]);

  const handlePage = (page: number) => {
    setLoading(true);
    setPage(page);
  };

  const handleSortColumn = (sortColumn : string, sortType : any) => {
    setLoading(true);
    if (sortColumn && sortType) {
      const sorted = [...data].sort((a : any, b : any) => {
        let x : number  = a[sortColumn].charCodeAt();
        let y : number = b[sortColumn].charCodeAt();
        if (sortType === 'asc') 
          return x - y;
        else 
          return y - x;
      });
      setData(sorted);
    }
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  const handleNavigate = (data : any) =>  { 
    try {
      let url = new URL(data.url);
      let personId = url.pathname.split('/')[3];
      navigate('/person/' + personId, { replace: true })
    } 
    catch (e) {
      console.error('Un-parsable URL', e);
    }

  };
  return (
    <div className="People">
      <Panel bordered bodyFill>
        <Table height={getHeight(window) - 420}
          width={getWidth(window) - 890}
          data={data}
          loading={loading}
          onRowClick={handleNavigate}
          sortColumn={sortColumn}
          sortType={sortType}
          onSortColumn={handleSortColumn}
          >
          <Column width={200} align="center" fixed sortable>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="name" />
          </Column>

          <Column>
            <HeaderCell>Height</HeaderCell>
            <Cell dataKey="height" />
          </Column>

          <Column >
            <HeaderCell>Mass</HeaderCell>
            <Cell dataKey="mass" />
          </Column>

          <Column >
            <HeaderCell>Hair Color</HeaderCell>
            <Cell dataKey="hair_color" />
          </Column>
          <Column>
            <HeaderCell>Skin Color</HeaderCell>
            <Cell dataKey="skin_color" />
          </Column>
          <Column>
            <HeaderCell>Eye Color</HeaderCell>
            <Cell dataKey="eye_color" />
          </Column>
          <Column sortable>
            <HeaderCell>Birth Year</HeaderCell >
            <Cell dataKey="birth_year" />
          </Column>
          <Column>
            <HeaderCell>Gender</HeaderCell>
            <Cell dataKey="gender" />
          </Column>
        </Table>
        <div style={{ padding: 20 }}>
          <Pagination
            prev
            next
            first
            last
            limit={10}
            size="lg"
            layout={['pager', '-', 'total']}
            total={count}
            activePage={page}
            onChangePage={handlePage}
           />
        </div>
      </Panel>
    </div>
  );
};
export default People;