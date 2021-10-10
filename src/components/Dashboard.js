import React, { useState } from "react";
import { Card, Button, Alert, Badge, Table } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";

export const Dashboard = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const reservationData = useData();
  const reservationsList = reservationData.reservationsList;
  const dbRef = db.ref("Rooms");
  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch (error) {
      setError("Failed to logout!");
    }
  };

  let now = new Date();
  let onejan = new Date(now.getFullYear(), 0, 1);
  let week = Math.ceil(
    ((now.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7
  );
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const printTh = () => {
    let ths = [];
    for (let i = 0; i < weekdays.length; i++) {
      ths.push(<th key={i}>{weekdays[i]}</th>);
    }
    return ths;
  };
  const monday = reservationsList.filter(
    (reservation) => reservation.day === "Monday"
  );
  const tuesday = reservationsList.filter(
    (reservation) => reservation.day === "Tuesday"
  );
  const wednesday = reservationsList.filter(
    (reservation) => reservation.day === "Wednesday"
  );
  const thursday = reservationsList.filter(
    (reservation) => reservation.day === "Thursday"
  );
  const friday = reservationsList.filter(
    (reservation) => reservation.day === "Friday"
  );
  const saturday = reservationsList.filter(
    (reservation) => reservation.day === "Saturday"
  );
  const sunday = reservationsList.filter(
    (reservation) => reservation.day === "Sunday"
  );
  console.log(reservationsList);
  const whichDay = (day) => {
    switch (day) {
      case "Monday":
        return monday;
      case "Tuesday":
        return tuesday;
      case "Wednesday":
        return wednesday;
      case "Thursday":
        return thursday;
      case "Friday":
        return friday;
      case "Saturday":
        return saturday;
      case "Sunday":
        return sunday;
      default:
        return null;
    }
  };
  const printTd = (room) => {
    let tds = [];
    for (let i = 0; i < 7; i++) {
      tds.push(
        <td key={i} id={`Room ${room} - ${weekdays[i]}`}>
          {whichDay(weekdays[i]).map(
            (item) =>
              item.room === room && (
                <>
                  <p>
                    {
                      <Badge
                        pill
                        className="bg-light text-dark p-1"
                        style={{ fontSize: "1rem" }}
                      >
                        {item.user + " " + item.time}
                      </Badge>
                    }{" "}
                    {currentUser.email === item.user && (
                      <Button
                        variant="danger"
                        onClick={() => deleteReservation(item.id)}
                      >
                        X
                      </Button>
                    )}
                  </p>
                </>
              )
          )}
          <Button onClick={() => makeReservation(room, weekdays[i])}>
            Book
          </Button>
        </td>
      );
    }
    return tds;
  };

  const makeReservation = async (room, day) => {
    const utcDay = new Date().getUTCDay();
    console.log(utcDay);
    const time = prompt("Which time?");
    const user = currentUser.email;
    const reservation = {
      room,
      week,
      day,
      time,
      user,
    };
    console.log(reservation);
    if (time) {
      dbRef.push(reservation);
    } else {
      alert("Insert a valid time");
    }
  };

  const deleteReservation = (id) => {
    dbRef.child(id).remove();
  };

  const ths = printTh();
  const tdsRoom1 = printTd(1);
  const tdsRoom2 = printTd(2);
  const tdsRoom3 = printTd(3);
  return (
    <>
      <Card className="flex-row" style={{ overflow: "auto" }}>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Badge
            pill
            className="text-dark w-100 text-center p-1"
            style={{ fontSize: "1.2rem" }}
          >
            Hi {currentUser.email},{" "}
            <p className="mt-3">make your reservation for this week</p>
          </Badge>
          <Badge pill className="text-dark w-100 text-center">
            <Button variant="secondary" onClick={handleLogout}>
              Log Out
            </Button>
          </Badge>
        </Card.Body>
      </Card>
      <Card className="flex-row" style={{ overflow: "auto" }}>
        <Card.Body>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Room</th>
                {ths.map((th) => th)}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                {tdsRoom1.map((td) => td)}
              </tr>
              <tr>
                <td>2</td>
                {tdsRoom2.map((td) => td)}
              </tr>
              <tr>
                <td>3</td>
                {tdsRoom3.map((td) => td)}
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};
