import { DeleteOutlined, Visibility } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import axios from "axios";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Tooltip as ChartTooltip,
  Legend,
  LinearScale,
  Title
} from "chart.js";
import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom"; 
import '../styles//Dashboard.css';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend);

const Dashboard = ({ userID }) => {
  const [dashboardData, setDashboardData] = useState({
    total_accounts: 0,
    total_projects: 0,
    projects_today: 0,
    users_online: 0,
  });
  const [chartData, setChartData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [userResults, setUserResults] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    axios
      .get("http://localhost:8081/dashboard")
      .then((response) => {
        const data = response.data;

        setDashboardData(data);

        setChartData({
          labels: ["Total Accounts", "Total Projects"],
          datasets: [
            {
              label: "Dashboard Metrics",
              data: [data.total_accounts, data.total_projects],
              backgroundColor: [
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
                "rgba(54, 162, 235, 0.6)",
              ],
              borderColor: [
                "rgba(75 , 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(54, 162, 235, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error.message);
      });
  }, []);


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get("http://localhost:8081/users")
      .then(response => {
        setUserResults(response.data);
      })
      .catch(error => {
        console.error("Error fetching users:", error.message);
      });
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert("Please enter a username to search.");
      return;
    }
    axios.get(`http://localhost:8081/users/search?username=${searchQuery}`)
      .then(response => {
        setUserResults(response.data);
      })
      .catch(error => {
        console.error("Error searching users:", error.message);
      });
  };

  const handleDeleteUser = (userId, userName) => {
    const confirmation = window.confirm(`Are you sure you want to delete the user ${userName} (ID: ${userId})?`);
    if (confirmation) {
      axios.delete(`http://localhost:8081/users/${userId}`)
        .then(response => {
          fetchUsers();
        })
        .catch(error => {
          console.error("Error deleting user:", error.message);
          alert("Error deleting user. Please try again.");
        });
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchUserProjects = (userId) => {
    axios.get(`http://localhost:8081/projects/${userId}`)
      .then(response => {
        if (response.data.length > 0) {
          setProjects(response.data);
        } else {
          setProjects([]); 
        }
      })
      .catch(error => {
        console.error("Error fetching projects:", error.message);
        setProjects([]); 
      });
  };


const fetchUserPortfolios = (userId) => {
  axios
    .get(`http://localhost:8081/portfolio/${userId}`)
    .then((response) => {
      if (Array.isArray(response.data)) {
        setPortfolios(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setPortfolios([]); 
      }
    })
    .catch((error) => {
      console.error("Error fetching portfolios:", error.message);
      setPortfolios([]);
    });
};

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
    fetchUserProjects(user.Id); 
    fetchUserPortfolios(user.Id);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{textAlign:"center", marginBottom:"50px", color:" #202258"}}>Dashboard</h1>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {Object.entries(dashboardData).map(([key, value]) => (
          <div key={key} style={cardStyle}>
            <h3 style={{color:' #202258'}}>{key.replace(/_/g, " ").toUpperCase()}</h3>
            <p>{value}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "40px", display: "flex", justifyContent: "space-around" }}>
        <div style={{ width: "45%", border: "5px solid #93bfb7",borderRadius:"15px", padding: "8px"  }}>
          <h3 style={{color:' #202258', textAlign:"center"}}>Bar Chart</h3>
          {chartData && <Bar data={chartData} />}
        </div>

        <div style={{ width: "45%", border: "5px solid #93bfb7",borderRadius:"15px", padding: "8px"  }}>
          <h3>User Search</h3>
          <div className="search-input-container">
    <input
      type="text"
      placeholder="Search by username"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="search-input" 
    />
    <button
      onClick={handleSearch}
      className="search-button"
    >
      <FaSearch />
    </button>
  </div>

          <TableContainer component={Paper} className="table-container" sx={{ boxShadow: 'none' }}>
  <Table sx={{ minWidth: 700 }} aria-label="customized table">
    <TableHead>
      <TableRow>
        <TableCell>Username</TableCell>
        <TableCell align="right">Email</TableCell>
        <TableCell align="right">Details</TableCell>
        <TableCell align="right">Delete</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {userResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
        <TableRow key={user.Id}>
          <TableCell>{user.userName}</TableCell>
          <TableCell align="right">{user.email}</TableCell>
          <TableCell align="right">
            <Visibility 
              className="search-icon" 
              onClick={() => handleOpenModal(user)} 
            />
          </TableCell>
          <TableCell align="right">
            <OverlayTrigger placement="top" overlay={<Tooltip>Delete User</Tooltip>}>
              <DeleteOutlined
                className="delete-icon"
                onClick={() => handleDeleteUser(user.Id, user.userName)}
              />
            </OverlayTrigger>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>


      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={userResults.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
        </div>
      </div>

      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" className="custom-dialog-content">
  <DialogTitle>
    {selectedUser ? (
      <>
<h3 style={{ fontWeight: "bold", color: "#202258" }}>
  {selectedUser.userName} (ID: {selectedUser.Id})&nbsp;
</h3>        
      </>
    ) : (
      "User Projects"
    )}
  </DialogTitle>
  <hr/>
  <DialogContent>
  {projects.length > 0 ? (
  <div>
    <h3 style={{ fontWeight: "bold", color: "#202258"}}>Project Proposed</h3>
    <div className="project-container">
    {projects.map((project, index) => (
      <div key={index} className="project-box">
        <p>{project.projectName}</p>
      </div>
    ))}
  </div>
  </div>
) : (
  <p>No projects found for this user.</p>
)}
  </DialogContent>
  <hr/>
  <DialogContent>
    {portfolios.length > 0 ? (
      <div>
        <h3 style={{ fontWeight: "bold", color: "#202258" }}>Portfolio</h3>
        <div className="project-container">
          {portfolios.map((portfolio, index) => (
            <div key={index} className="project-box">
              <p>{portfolio.project_name}</p>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <p>No portfolio found for this user.</p>
    )}
  </DialogContent>
  <hr/>

  <DialogActions>
    <Button onClick={handleCloseModal} className="close-button">
      Close
    </Button>
    <Link 
    to={`/profile/${selectedUser ? selectedUser.Id : ''}`} 
    style={{ textDecoration: "none" }}
  >
    <Button className="close-button">
      View Profile
    </Button>
  </Link>
  </DialogActions>
</Dialog>

    </div>
  );
};



const cardStyle = {
  border: "1px solid #ccc",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
  backgroundColor: "#f9f9f9",
  width: "20%",
  border: "5px solid #93bfb7",borderRadius:"15px", padding: "8px" 
};

export default Dashboard;
