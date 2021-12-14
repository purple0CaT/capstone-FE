export const freeAppHours = (date: Date, creator: any) => {
  if (date && creator) {
    const pickedAvailability = creator.booking.availability.filter(
      (Av: any) =>
        new Date(date).getDay() === new Date(Av.start).getDay() &&
        new Date(date).getMonth() === new Date(Av.start).getMonth(),
    )[0];
    if (
      new Date(pickedAvailability.start).getDay() === new Date().getDay() &&
      new Date(pickedAvailability.start).getMonth() === new Date().getMonth()
    ) {
      const date = new Date(pickedAvailability.start).setHours(
        new Date().getHours() + 2,
      );
      pickedAvailability.start = date;
      //   console.log(new Date(date));
    }
    //  pick this day appointments
    const thisDayApp = creator.booking.appointments.filter(
      (Ap: any) =>
        new Date(pickedAvailability.start).getDay() ===
          new Date(Ap.appointmentDate).getDay() &&
        new Date(pickedAvailability.start).getMonth() ===
          new Date(Ap.appointmentDate).getMonth() &&
        Ap.confirmed === true,
    );
    let freeHours = [];
    for (
      let i = new Date(pickedAvailability.start).getHours();
      i < new Date(pickedAvailability.end).getHours();
      i++
    ) {
      let check = thisDayApp.some(
        (App: any) => new Date(App.appointmentDate).getHours() === i,
      );
      if (!check) {
        freeHours.push(i);
      }
    }
    // console.log(" Picked Availab", pickedAvailability);
    // console.log("This day appointments", thisDayApp);
    // console.log("Free hours to pick", freeHours);
    return freeHours;
  }
};
