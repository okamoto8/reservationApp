import React from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './Navigation.css';
import { useReservation } from '../../contexts/ReservationContext';

function Navigation() {
    const navigate = useNavigate();
    const { reservationTables } = useReservation();

  return (
  <SideNav
    onSelect={(selected) => {
        navigate(selected);
    }}
    >
    <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="/">
          <NavIcon>
            <i className="fa fa-fw fa-home" style={{ fontSize: '24px' }} />
          </NavIcon>
          <NavText>
            予約表一覧
          </NavText>
          {reservationTables.map((table) => (
            <NavItem key={table.id} eventKey={`/reservation-table/${table.id}`}>
              <NavText>
                {table.name}
              </NavText>
            </NavItem>
          ))}
        </NavItem>
        <NavItem eventKey="settings">
            <NavIcon>
                <i className="fa fa-fw fa-cog" style={{ fontSize: '24px' }} />
            </NavIcon>
            <NavText>
                設定
            </NavText>
            <NavItem eventKey="settings/add-reservation-table">
                <NavText>
                    新規予約表追加
                </NavText>
            </NavItem>
            <NavItem eventKey="settings/delete-reservation-table">
                <NavText>
                    予約表削除
                </NavText>
                </NavItem>
            </NavItem>
        </SideNav.Nav>
    </SideNav>
  )
}

export default Navigation
