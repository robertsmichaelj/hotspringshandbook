


$directory = "http://www.hotspringshandbook.com/activities/hotsprings/kirkham/imgs";
$images = glob($directory . "*.jpg");

foreach($images as $image)
{
  echo $image;
}