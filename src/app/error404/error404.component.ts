import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { DbService } from '../services/db.service';


@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {

  constructor(private router: Router,private dbService: DbService) {
    dbService.IsWrongUrl.next(true);
  }

  goHome() {
    this.dbService.IsWrongUrl.next(false);
    console.log("Redirecting to Home by Error Component");
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    gsap.set("svg", { visibility: "visible" });
    gsap.to("#headStripe", {
      y: 0.5,
      rotation: 1,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      duration: 1
    });
    gsap.to("#spaceman", {
      y: 0.5,
      rotation: 1,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      duration: 1
    });
    gsap.to("#craterSmall", {
      x: -3,
      yoyo: true,
      repeat: -1,
      duration: 1,
      ease: "sine.inOut"
    });
    gsap.to("#craterBig", {
      x: 3,
      yoyo: true,
      repeat: -1,
      duration: 1,
      ease: "sine.inOut"
    });
    gsap.to("#planet", {
      rotation: -2,
      yoyo: true,
      repeat: -1,
      duration: 1,
      ease: "sine.inOut",
      transformOrigin: "50% 50%"
    });

    gsap.to("#starsBig g", {
      rotation: "random(-30,30)",
      transformOrigin: "50% 50%",
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
    gsap.fromTo(
      "#starsSmall g",
      { scale: 0, transformOrigin: "50% 50%" },
      { scale: 1, transformOrigin: "50% 50%", yoyo: true, repeat: -1, stagger: 0.1 }
    );
    gsap.to("#circlesSmall circle", {
      y: -4,
      yoyo: true,
      duration: 1,
      ease: "sine.inOut",
      repeat: -1
    });
    gsap.to("#circlesBig circle", {
      y: -2,
      yoyo: true,
      duration: 1,
      ease: "sine.inOut",
      repeat: -1
    });

    gsap.set("#glassShine", { x: -68 });

    gsap.to("#glassShine", {
      x: 80,
      duration: 2,
      rotation: -30,
      ease: "expo.inOut",
      transformOrigin: "50% 50%",
      repeat: -1,
      repeatDelay: 8,
      delay: 2
    });
  }

}
