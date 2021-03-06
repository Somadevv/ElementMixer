# Generated by Django 2.2.25 on 2022-01-23 15:07

from django.conf import settings
import django.contrib.postgres.fields
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Elements',
            fields=[
                ('elementId', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=20, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Recipes',
            fields=[
                ('recipe', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=12)),
                ('combination', django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), size=None)),
                ('reward', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('credits', models.IntegerField(default=500)),
                ('recipes', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=50, null=True), blank=True, default=list, null=True, size=None)),
                ('playerId', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Inventory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.IntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('eleId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.Elements')),
                ('name', models.ForeignKey(db_column='name', on_delete=django.db.models.deletion.CASCADE, related_name='elementName', to='app.Elements', to_field='name')),
                ('playerId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.Player')),
            ],
        ),
    ]
