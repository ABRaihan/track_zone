import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import style from "../../sass/helpers/userClock.module.scss";
import DigitalCircleClock from "../shared/DigitalCircleClock";
export default function UserClock() {
  //?@___Locale State___
  const [time, setTime] = useState(null);
  const [visible, setVisible] = useState(false);

  //?@___Handler Functions___
  const getSeparateTimes = (date) => {
    if (typeof date !== "object" || Array.isArray(date))
      return { hrs: 0, min: 0, sec: 0 };
    const hrs = date.getHours(),
      min = date.getMinutes(),
      sec = date.getSeconds();
    return { hrs, min, sec };
  };

  const handleVisible = (value) => {
    setVisible(value);
  };

  //?@___On Mount Effect___
  useEffect(() => {
    const timerInterval = setInterval(() =>
      setTime(getSeparateTimes(new Date()))
    );
    return () => clearInterval(timerInterval);
  }, []);
  return (
    <Container maxWidth="xl" className={style.userClock}>
      <div className={style.wrapper}>
        <p className={style.title}> Locale Clock</p>
        <div className={style.clock__box}>
          {time && (
            <DigitalCircleClock hrs={time.hrs} min={time.min} sec={time.sec} />
          )}
          <div className={style.actions}>
            <p className={style.actions__title}>Clock Actions</p>
            <Button
              variant="contained"
              className={style.actions__btn}
              onClick={handleVisible.bind(null, true)}
            >
              Edit
            </Button>
          </div>
        </div>
        <Modal
          open={visible}
          onClose={handleVisible.bind(null, false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {/* <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box> */}
          <h1>My Modal</h1>
        </Modal>
      </div>
    </Container>
  );
}
