import styles from './categoryCarousel.module.scss'
import Link from 'next/link'

import Tilt from './../../../components/VanillaTilt/index'

export default function CategoryCarousel(){

    const options = {
        scale: 1,
        speed: 3000,
        max: 10
    };

    return(
        <>

            <div className={styles.categoryCarouselContainer}>
                <Tilt options={options}>
                    <Link href="/categorie/html">
                        <div>
                            <img src="https://images.prismic.io/tavanoblog/e977ebf3-f776-42b0-8c07-8fe73b2939e5_html.png?auto=compress,format" alt="" />
                        </div>
                    </Link>
                </Tilt>
                <Tilt options={options}>
                    <Link href="/categorie/css">
                        <div>
                            <img src="https://images.prismic.io/tavanoblog/302ead25-9724-4e75-9302-d7c09b6bcf19_css.png?auto=compress,format" alt="" />
                        </div>
                    </Link>
                </Tilt>
                <Tilt options={options}>
                    <Link href="/categorie/javascript">
                        <div>
                            <img src="https://images.prismic.io/tavanoblog/8e6d3625-6981-4eb5-a2cb-ed8ce2bdc9b3_javascript-logo.png?auto=compress,format" alt="" />
                        </div>
                    </Link>
                </Tilt>
                <Tilt options={options}>
                    <Link href="/categorie/vtex">
                        <div>
                            <img src="https://images.prismic.io/tavanoblog/f5ea21bc-988b-4376-950e-ec92bb12dcfc_vtex.jpg?auto=compress,format" alt="" />
                        </div>
                    </Link>
                </Tilt>
                <Tilt options={options}>
                    <Link href="/categorie/seo">
                        <div>
                            <img src="https://images.prismic.io/tavanoblog/4d13cf99-cfe0-4fa8-9949-d5ca0d8d61d9_seo.png?auto=compress,format" alt="" />
                        </div>
                    </Link>
                </Tilt>
            </div>
        </>
    )
}

